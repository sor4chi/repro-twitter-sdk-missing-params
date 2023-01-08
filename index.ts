import { Client } from "twitter-api-sdk";
import { config } from "dotenv";

config();

if (!process.env.BEARER_TOKEN || !process.env.TWEET_ID) {
  throw new Error(
    "Missing environment variables, set BEARER_TOKEN and TWEET_ID."
  );
}

const client = new Client(process.env.BEARER_TOKEN);

const res = await client.tweets.findTweetById(process.env.TWEET_ID, {
  "tweet.fields": ["public_metrics"],
});

if (!res.data?.public_metrics) throw new Error("No data found");

console.log(res.data.public_metrics); // get 5 properties, including impression_count
// console.log(res.data.public_metrics.impression_count); compile error for missing property, but it's there

const res2 = await client.tweets.findTweetById(process.env.TWEET_ID, {
  "tweet.fields": ["non_public_metrics"],
});

// console.log(res2.data.non_public_metrics); // get undefined, I think it's because "impression_count" moved to "public_metrics"
// console.log(res2.data.non_public_metrics.impression_count); able to compile, but cant get the value
