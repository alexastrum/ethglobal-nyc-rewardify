// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// import "./OptimisticOracleV3Interface.sol";

import "hardhat/console.sol";

/**
 * @title Owner
 * @dev Set & change owner
 */
contract YourContract {
	struct Drop {
		// If you can limit the length to a certain number of bytes,
		// always use one of bytes1 to bytes32 because they are much cheaper
		string triggerText;
		uint256 amount;
		uint cooldownSeconds;
		uint256 deposit;
	}

	struct AssertedClaim {
		bytes32 claimId;
		address dropId;
		uint256 amount;
	}

	mapping(address => Drop) internal drops;
	mapping(address => AssertedClaim) internal claimsInProgress;

	address private owner;

	// event for EVM logging
	event OwnerSet(address indexed oldOwner, address indexed newOwner);

	// modifier to check if caller is owner
	modifier isOwner() {
		// If the first argument of 'require' evaluates to 'false', execution terminates and all
		// changes to the state and to Ether balances are reverted.
		// This used to consume all gas in old EVM versions, but not anymore.
		// It is often a good idea to use 'require' to check if functions are called correctly.
		// As a second argument, you can also provide an explanation about what went wrong.
		require(msg.sender == owner, "Caller is not owner");
		_;
	}

	/**
	 * @dev Set contract deployer as owner
	 */
	constructor() {
		console.log("Owner contract deployed by:", msg.sender);
		owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
		emit OwnerSet(address(0), owner);
	}

	/**
	 * @dev Change owner
	 * @param newOwner address of new owner
	 */
	function changeOwner(address newOwner) public isOwner {
		emit OwnerSet(owner, newOwner);
		owner = newOwner;
	}

	/**
	 * @dev Return owner address
	 * @return address of owner
	 */
	function getOwner() external view returns (address) {
		return owner;
	}

	/**
	 * Function that allows the owner to withdraw all the Ether in the contract
	 * The function can only be called by the owner of the contract as defined by the isOwner modifier
	 */
	function withdrawAll() public isOwner {
		(bool success, ) = owner.call{ value: address(this).balance }("");
		require(success, "Failed to send Ether");
	}

	/**
	 * Function that allows the contract to receive ETH
	 */
	receive() external payable {}

	function setDrop(
		string memory triggerText,
		uint256 amount,
		uint cooldownSeconds
	) external payable {
		// require(msg.value > 0, "Must send some ETH");
		// require(cooldownSeconds > 0, "Cooldown must be greater than 0");
		require(amount > 0, "Amount must be greater than 0");
		// require(triggerText != "", "Trigger text must not be empty");
		// require(drops[msg.sender].triggerText == "", "Drop already exists");

		uint256 totalDeposit = drops[msg.sender].deposit + msg.value;
		drops[msg.sender] = Drop(
			triggerText,
			amount,
			cooldownSeconds,
			totalDeposit
		);
	}

	function getDrop(address user) external view returns (Drop memory) {
		return drops[user];
	}

	function withdraw() external {
		Drop memory drop = drops[msg.sender];
		require(drop.deposit > 0, "No deposit to withdraw");
		drops[msg.sender].deposit = 0;
		(bool success, ) = msg.sender.call{ value: drop.deposit }("");
		require(success, "Failed to send Ether");
	}

	function triggerDrop(address dropId, address receiver) external {
		require(dropId == msg.sender || owner == msg.sender, "Not authorized");
		Drop memory drop = drops[dropId];
		require(drop.deposit > drop.amount, "No deposit to withdraw");
		drops[dropId].deposit -= drop.amount;
		(bool success, ) = receiver.call{ value: drop.amount }("");
		require(success, "Failed to send Ether");
	}

	// // Create an Optimistic Oracle V3 instance at the deployed address on Görli.
	// OptimisticOracleV3Interface oov3 =
	// 	OptimisticOracleV3Interface(0x9923D42eF695B5dd9911D05Ac944d4cAca3c4EAB);

	// function propareDropWithAssertedClaim(
	// 	address dropId,
	// 	address receiver,
	// 	string memory assertedClaim
	// ) external returns (bytes32) {
	// 	require(dropId == msg.sender || owner == msg.sender, "Not authorized");
	// 	Drop memory drop = drops[dropId];
	// 	require(
	// 		claimsInProgress[receiver].claimId == bytes32(0),
	// 		"Another claim in progress"
	// 	);
	// 	require(drop.deposit > drop.amount, "No deposit to withdraw");
	// 	drops[dropId].deposit -= drop.amount;
	// 	claimsInProgress[receiver] = AssertedClaim(
	// 		oov3.assertTruthWithDefaults(bytes(assertedClaim), address(this)),
	// 		dropId,
	// 		drop.amount
	// 	);
	// }

	// function settleMyLastAssertion() external {
	// 	address receiver = msg.sender;
	// 	AssertedClaim memory assertedClaim = claimsInProgress[receiver];
	// 	require(
	// 		assertedClaim.claimId != bytes32(0),
	// 		"No claim in progress for sender"
	// 	);
	// 	require(
	// 		oov3.settleAndGetAssertionResult(assertedClaim.claimId),
	// 		"Claim not settled"
	// 	);
	// 	delete claimsInProgress[receiver];
	// 	(bool success, ) = receiver.call{ value: assertedClaim.amount }("");
	// 	require(success, "Failed to send Ether");
	// }

	// function revertMyLastAssertion() external {
	// 	address receiver = msg.sender;
	// 	AssertedClaim memory assertedClaim = claimsInProgress[receiver];
	// 	require(
	// 		assertedClaim.claimId != bytes32(0),
	// 		"No claim in progress for sender"
	// 	);
	// 	drops[assertedClaim.dropId].deposit += assertedClaim.amount;
	// 	delete claimsInProgress[receiver];
	// }

	// // Return the full assertion object contain all information associated with the assertion. Can be called any time.
	// function getLastAssertion(
	// 	address receiver
	// ) public view returns (OptimisticOracleV3Interface.Assertion memory) {
	// 	AssertedClaim memory assertedClaim = claimsInProgress[receiver];
	// 	require(
	// 		assertedClaim.claimId != bytes32(0),
	// 		"No claim in progress for sender"
	// 	);
	// 	return oov3.getAssertion(assertedClaim.claimId);
	// }
}
