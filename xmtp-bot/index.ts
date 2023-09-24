import run from "./xmtp-bot-starter/src/Runner";

require("dotenv").config();
// functions.logger.write({ severity: "DEBUG", message: "ENV", ...process.env });

run(async (context) => {
  const messageBody = context.message.content;
  await context.reply(`Validating tweet ${messageBody}...`);
  try {
    const resp = await fetch(
      `https://us-central1-rewardify.cloudfunctions.net/helloWorld?t=${messageBody}`
    );
    await context.reply(`Response: ${resp.text()}`);
  } catch (e) {
    await context.reply(`Error: ${e}`);
  }
});
