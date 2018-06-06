require("dotenv").config({ path: "./.env.local" });
const fetch = require("node-fetch");

const TWITTER_API_URL = "https://api.twitter.com/";
const TWITTER_API_VERSION = 1.1;
let _TWITTER_APP_TOKEN = null;
let twiAuthPromise = null;

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

const getHeaders = () => {
    if (twiAuthPromise !== null) {
        return twiAuthPromise;
    }
    twiAuthPromise = new Promise((resolve, reject) => {
        if (_TWITTER_APP_TOKEN !== null) {
            twiAuthPromise = null;
            const authHead = {
                ...basicHeaders(),
                "Authorization": `Bearer ${_TWITTER_APP_TOKEN}`,
            };
            resolve(authHead);
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
                console.warn("## Twitter token requested : \n", res.access_token);
                if (res && res.access_token) {
                    _TWITTER_APP_TOKEN = res.access_token;
                    const authHead = {
                        ...basicHeaders(),
                        "Authorization": `Bearer ${_TWITTER_APP_TOKEN}`,
                    };
                    twiAuthPromise = null;
                    resolve(authHead);
                }
            }).catch(err => {
                console.warn("ERROR token:: ", err);
                twiAuthPromise = null;
                reject();
            });
    });
    return twiAuthPromise;
};

const twitterRequest = async (verb = "GET", route = "", data = null) => {
    try {
        const headers = await getHeaders();
        console.log("GENERATED HEADER ", headers);
        let url = `${TWITTER_API_URL}${TWITTER_API_VERSION}/${route}`;
        if (verb === "GET" && data !== null) {
            const query = Object.keys(data)
                .map(key => `${key}=${data[key]}`)
                .join("&");
            
            url += `?${query}`; 
        }
        const options = {
            cache: "no-cache",
            headers,
            body: data !== null ? JSON.stringify(data) : "",
            method: verb,
            mode: "no-cors",
            redirect: "follow",
            referrer: "no-referrer",
        };
        if (!options.body || verb === "GET") {
            delete options.body;
        }
        return await fetch(url, options);
    } catch(e) {
        return {
            hasError: true,
            error: e
        };
    }
};

exports.twitterRequest = twitterRequest;
exports.initTwitterConnection = async () => {
    const res = await twitterRequest("GET", "statuses/user_timeline.json");
    console.log("\n############ REQUEST RESULTS ##############\n", res);
};
