// Checks the HYROX page and emails you when tickets look available.
// Edit the three settings below; that's the whole "config".
import fs from "node:fs";
import nodemailer from "nodemailer";

const URL = "https://hyrox.com/event/hyrox-houston-26-27/";
const AVAILABLE = /buy tickets here/i; // the yellow button that appears when tickets go on sale
const SOLD_OUT = null; // optional: a pattern that vetoes a match, e.g. /sold out/i

const STATE = ".state/last";
const html = await (await fetch(URL, { headers: { "user-agent": "Mozilla/5.0" } })).text();
const available = AVAILABLE.test(html) && !(SOLD_OUT && SOLD_OUT.test(html));
const was = fs.existsSync(STATE) && fs.readFileSync(STATE, "utf8") === "1";
console.log(available ? "AVAILABLE" : "not available");

if (available && !was && !process.env.DRY_RUN) {
  const { SMTP_USER, SMTP_PASS, EMAIL_TO = SMTP_USER } = process.env;
  await nodemailer
    .createTransport({ service: "gmail", auth: { user: SMTP_USER, pass: SMTP_PASS } })
    .sendMail({ from: SMTP_USER, to: EMAIL_TO, subject: "HYROX Houston tickets available!", text: URL });
  console.log("email sent");
}
fs.mkdirSync(".state", { recursive: true });
fs.writeFileSync(STATE, available ? "1" : "0");
