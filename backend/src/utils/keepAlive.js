import { CronJob } from "cron";
import http from "node:http";
import https from "node:https";

// Every 14 minutes, send a GET request to the root (/) endpoint to keep the server alive
const job = new CronJob("*/14 * * * *", function () {
  const base = process.env.FRONTEND_URL;
  if (!base) {
    console.log("ℹ️ FRONTEND_URL is not set. Keep-alive cron job is idle.");
    return;
  }
  
  try {
    const url = new URL("/", base).href;
    const client = url.startsWith("https:") ? https : http;

    console.log(`📡 Sending keep-alive request to: ${url}`);
    
    client
      .get(url, (res) => {
        if (res.statusCode === 200) {
          console.log("✅ Keep-alive GET request sent successfully");
        } else {
          console.log("⚠️ Keep-alive GET request returned status:", res.statusCode);
        }
      })
      .on("error", (e) => {
        console.error("❌ Error while sending keep-alive request:", e.message);
      });
  } catch (error) {
    console.error("❌ Invalid FRONTEND_URL configured for keep-alive:", error.message);
  }
});

export default job;
