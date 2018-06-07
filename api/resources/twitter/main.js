require("dotenv").config({ path: "./.env.local" });
const fetch = require("node-fetch");
const Twitter = require("twitter");

const TWITTER_API_URL = "https://api.twitter.com/";
let twiAuthPromise = null;
let __twitterClient = null;

const getEncodedCredentials = () => {
    if (!process.env.TWITTER_KEY || !process.env.TWITTER_SECRET) {
        throw Error("Missing twitter app creentials !");
    }

    const key = encodeURIComponent(process.env.TWITTER_KEY);
    const secret = encodeURIComponent(process.env.TWITTER_SECRET);
    return Buffer.from(`${key}:${secret}`).toString("base64");
};

const basicHeaders = () => ({
    "Host": "api.twitter.com",
    "User-Agent": "Poulay app",
    "Authorization": `Basic ${getEncodedCredentials()}`,
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Content-Length": "29",
    "Accept-Encoding": "gzip",
});

const getTwitterClient = () => {
    if (twiAuthPromise !== null) {
        return twiAuthPromise;
    }
    twiAuthPromise = new Promise((resolve, reject) => {
        if (__twitterClient !== null) {
            resolve(__twitterClient);
        }
        // init a connection with a new token
        fetch(`${TWITTER_API_URL}/oauth2/token`, {
            cache: "no-cache",
            headers: basicHeaders(),
            body: "grant_type=client_credentials",
            method: "POST",
            mode: "no-cors",
            redirect: "follow",
            referrer: "no-referrer",
        })
            .then(res => res.json())
            .then(res => {
                console.warn("Twitter token requested fetched");
                if (res && res.access_token) {
                    twiAuthPromise = null;
                    __twitterClient = new Twitter({
                        consumer_key: process.env.TWITTER_KEY,
                        consumer_secret: process.env.TWITTER_SECRET,
                        bearer_token: res.access_token
                    });
                    resolve(__twitterClient);
                }
            }).catch(err => {
                console.warn("ERROR token:: ", err);
                twiAuthPromise = null;
                reject();
            });
    });
    return twiAuthPromise;
};


exports.getTwitterClient = getTwitterClient;
