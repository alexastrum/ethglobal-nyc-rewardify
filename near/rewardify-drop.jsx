// FETCH ABI

const myContract = "0x1CB2c332D190EED0Ba8A61c81d68a82b91321aD9";
const tokenDecimals = 18;

const myContractAbi = fetch("https://rewardify.web.app/YourContract.json");
if (!myContractAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(myContractAbi.body);

// HELPER FUNCTIONS

const getContractState = (receiver) => {
  if (!state.sender) {
    return;
  }
  const encodedData = iface.encodeFunctionData("getDrop", [receiver]);

  return Ethers.provider()
    .call({
      to: myContract,
      data: encodedData,
    })
    .then((raw) => {
      const data = iface.decodeFunctionResult("getDrop", raw);

      return data;
    });
};

if (state.sender) {
  getContractState(state.sender).then((data) => {
    State.update(data);
  });
}

State.init({
  triggerText: `#rewardify`,
  amount: 1,
  cooldownSeconds: 60,
  walletAddress: "",
  balance,
});

const API_URL = "https://us-central1-rewardify.cloudfunctions.net/helloWorld";

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0], walletAddress: accounts[0] });
    console.log("set sender", accounts[0]);
  }
}

const handleButtonClick = async () => {
  const contract = new ethers.Contract(
    myContract,
    myContractAbi.body,
    Ethers.provider().getSigner()
  );

  contract
    .submit(myContract, {
      dropId: state.walletAddress,
      amount: state.amount,
      cooldownSeconds: state.cooldownSeconds,
    })
    .then((transactionHash) => {
      console.log("transactionHash is " + transactionHash);
    });
};

const handleInputChange = (e) => {
  console.log(e.target);
  State.update({
    [e.target.id]: e.target.value,
  });
};

const networks = ["Polygon"];

return (
  <>
    <div class="card mt-5">
      <div class="card-header d-flex justify-content-between align-items-center p-3">
        <h2 className="mb-0">Rewardify drop</h2>
        <div className="d-flex flex-row align-items-center">
          <Web3Connect connectLabel="Connect wallet" />
        </div>
      </div>

      <div class="d-flex justify-content-start align-items-center p-3">
        <label for="value">Trigger text</label>
        <input
          className="form-control ms-2"
          onChange={handleInputChange}
          type="text"
          placeholder=""
          value={state.triggerText}
          id="triggerText"
        />
      </div>

      <div class="d-flex justify-content-start align-items-center p-3">
        <label for="value">Network</label>
        <Typeahead
          className="ms-2"
          options={networks}
          onChange={(value) => {
            State.update({ network: value[0] });
          }}
          value={[state.network]}
        />
      </div>

      <div class="d-flex justify-content-start align-items-center p-3">
        <label for="value">Amount</label>
        <input
          className="form-control ms-2"
          onChange={handleInputChange}
          type="text"
          placeholder=""
          value={state.amount}
          id="amount"
        />
      </div>

      <div class="d-flex justify-content-start align-items-center p-3">
        <label for="value">Cooldown</label>
        <input
          className="form-control ms-2 me-2"
          onChange={handleInputChange}
          type="text"
          placeholder=""
          value={state.cooldownSeconds}
          id="cooldownSeconds"
        />
        seconds
      </div>

      <div class="card-footer text-muted justify-content-start align-items-center p-3">
        <button
          class="btn btn-primary"
          onClick={handleButtonClick}
          disabled={
            !state.triggerText ||
            !state.network ||
            !state.amount ||
            !state.cooldownSeconds
          }
        >
          Save drop
        </button>
        {JSON.stringify(state)}
        <p>
          Claim URL:{" "}
          <a class="underline">
            https://near.social/a13x.near/widget/ethglobal-nyc-rewardify-drop?drop=
            {state.walletAddress}
          </a>
        </p>
      </div>
    </div>
  </>
);
