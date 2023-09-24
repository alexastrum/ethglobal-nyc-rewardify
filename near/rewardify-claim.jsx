const drop = props.drop || "";

const API_URL = `https://us-central1-rewardify.cloudfunctions.net/helloWorld?a=${drop}&t=`;

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0], walletAddress: accounts[0] });
    console.log("set sender", accounts[0]);
  }
}

const handleButtonClick = async () => {
  return asyncFetch(API_URL + encodeURIComponent(state.tweetUrl), {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  }).then((res) => {
    State.update({ result: JSON.stringify(res.body) });
  });
};

const handleInputChange = (e) => {
  console.log(e.target);
  State.update({
    [e.target.id]: e.target.value,
  });
};

return (
  <>
    <div class="card mt-5">
      <div class="card-header d-flex justify-content-between align-items-center p-3">
        <h2 className="mb-0">Rewardify claim</h2>
        <div className="d-flex flex-row align-items-center">
          <Web3Connect connectLabel="Connect wallet" />
        </div>
      </div>

      <div class="d-flex justify-content-start align-items-center p-3">
        <label for="value">Tweet URL</label>
        <input
          className="form-control ms-2 me-2"
          onChange={handleInputChange}
          type="text"
          placeholder=""
          value={state.tweetUrl}
          id="tweetUrl"
        />
      </div>

      <div class="card-footer text-muted justify-content-start align-items-center p-3">
        <button
          class="btn btn-primary"
          onClick={handleButtonClick}
          disabled={!state.tweetUrl}
        >
          Claim
        </button>
        {result}
      </div>
    </div>
  </>
);
