require("dotenv").config({ path: "./.env.local" });
const fetch = require("node-fetch");

const TWITTER_API_URL = "https://api.twitter.com/";

let _TWITTER_APP_TOKEN = null;

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
    // "grant_type": "client_credentials"
});

const getHeaders = () => {
    new Promise((resolve, reject) => {
        const returnAllGood = () => resolve({
            ...basicHeaders(),
            "Bearer": `Bearer ${_TWITTER_APP_TOKEN}`,
        });
        if (_TWITTER_APP_TOKEN !== null) {
            returnAllGood();
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
                console.warn("## Inited twitter token ##\n");
                if (res && res.access_token) {
                    _TWITTER_APP_TOKEN = res.access_token;
                    returnAllGood();
                }
            }).catch(err => {
                console.warn("ERROR token:: ", err);
                reject();
            });
        returnAllGood();
    });
};


exports.getBasicHeader = () => ({ ...basicHeaders() });
exports.getHeaders = getHeaders;
exports.getEncodedCredentials = getEncodedCredentials;
exports.baseUrl = TWITTER_API_URL;
exports.initTwitterConnection = () => {
    getHeaders();
};