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
// import Realtime Database
import * as admin from "firebase-admin";

import { setGlobalOptions } from "firebase-functions/v2/options";
const { convert } = require("html-to-text");

// import * as Twit from "twit";
// const Twit = require("twit");
// import { Scraper } from "@the-convocation/twitter-scraper";
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
admin.initializeApp();

interface Drop {
  // addr: string;
  triggerText: string;
  amount: number;
  cooldownSeconds: number;
}

interface Tweet {
  // tweetId: string;
  addr: string;
  tweetText: string;
  transaction: string;
}

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
    const tweetUrl =
      (req.query.t as string) ||
      `https://twitter.com/NEARProtocol/status/1705350784328593807`;

    const dropId = (req.query.d as string) || `test`;

    // Read from RTDB
    const dropData = ((
      await admin.database().ref(`/drops/${dropId}`).once("value")
    ).val() as Drop) || {
      addr: `0xc3E9F4049e5f2cCe41ce9b59a93dC333E104A6a8`,
      triggerText: `#rewardify`,
      amount: 1,
      cooldownSeconds: 60,
    };

    const addr =
      (req.query.a as string) || `0xc3E9F4049e5f2cCe41ce9b59a93dC333E104A6a8`;

    const tweet = await fetch(
      `https://publish.twitter.com/oembed?omit_script=1&url=${encodeURIComponent(
        tweetUrl
      )}`
    );
    const tweetJson = await tweet.json();

    // res.json(tweetJson);
    if (!tweetJson.url) {
      throw new Error(`Tweet ${tweetUrl} not found`);
    }

    // const authorHandle = tweetJson.author_url.split("/")[3];
    const tweetId = tweetJson.url.split("/")[5];
    const tweetText = convert(tweetJson.html, {}) as string;

    let tweetData = (
      await admin.database().ref(`/tweets/${tweetId}`).once("value")
    ).val() as Tweet | null;

    if (tweetData) {
      throw new Error(`Tweet ${tweetId} already claimed`);
    }

    if (!tweetText.indexOf(dropData.triggerText)) {
      throw new Error(
        `Tweet does not contain trigger text ${dropData.triggerText}`
      );
    }

    if (!tweetText.indexOf(addr)) {
      throw new Error(`Tweet does not contain address ${addr}`);
    }

    const lastClaim =
      ((
        await admin.database().ref(`/lastClaim/${dropId}/${addr}`).once("value")
      ).val() as number) || 0;

    if (
      lastClaim &&
      dropData.cooldownSeconds &&
      Date.now() - lastClaim < dropData.cooldownSeconds * 1000
    ) {
      throw new Error(
        `Address ${addr} already claimed drop ${dropId} in the last ${dropData.cooldownSeconds} seconds`
      );
    }

    await admin.database().ref(`/lastClaim/${dropId}/${addr}`).set(Date.now());

    tweetData = {
      addr,
      transaction: ``,
      tweetText,
    };
    await admin.database().ref(`/tweets/${tweetId}`).set(tweetData);

    // TODO: Send dropData.amount to addr
    tweetData.transaction = `...`;
    await admin.database().ref(`/tweets/${tweetId}`).set(tweetData);

    res.json({ tweetData, dropData });

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
    // }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }

  //   logger.info("Hello logs!", { structuredData: true });
  //   response.send("Hello from Firebase!");
});
