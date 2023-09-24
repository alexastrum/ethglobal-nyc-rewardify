/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { setGlobalOptions } from "firebase-functions/v2/options";
// import * as Twit from "twit";
// const Twit = require("twit");
import { Scraper } from "@the-convocation/twitter-scraper";
// import * as URL from "url";
require("dotenv").config();

// Replace with your Twitter API credentials
// const config = {
//   consumer_key: process.env.TWITTER_CONSUMER_KEY || "...",
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET || "...",
//   access_token: process.env.TWITTER_ACCESS_TOKEN || "...",
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || "...",
// };
// const T = new Twit(config);

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

setGlobalOptions({ maxInstances: 10 });

export const helloWorld = onRequest(async (req, res) => {
  //   logger.write({
  //     severity: "DEBUG",
  //     message: "config",
  //     ...config,
  //   });
  logger.write({
    severity: "DEBUG",
    message: "request",
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  // Set CORS headers for preflight requests to allow POSTs from any origin
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  // Do not cache responses
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    // Extract the tweet ID from the URL
    const tweetID = (req.query["t"] as string) || "1234567890123456789";

    // Fetch the tweet using the ID
    // const scraper = new Scraper();
    // if (!(await scraper.isLoggedIn())) {
    //   await scraper.login(
    //     process.env.TWITTER_USERNAME,
    //     process.env.TWITTER_PASSWORD,
    //     process.env.TWITTER_CODE
    //   );
    // }
    // const tweet = await scraper.getTweet(tweetID);
    // res.status(200).json({ text: tweet.text });

    // const tweet = await T.get("statuses/show/:id", { id: tweetID });
    // if (tweet.data?.text) {
    //   res.status(200).json({ text: tweet.data.text });
    // } else {
    //   res.status(404).json({ error: "Tweet not found" });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal server error" });
  }

  //   logger.info("Hello logs!", { structuredData: true });
  //   response.send("Hello from Firebase!");
});
