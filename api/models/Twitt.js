const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    id_str: {
        type: String
    },
    name: {
        type: String
    },
    screen_name: {
        type: String
    },
    location: {
        type: String
    },
    url: {
        type: String
    },
    description: {
        type: String
    },
    protected: {
        type: Boolean
    },
    followers_count: {
        type: Number
    },
    friends_count: {
        type: Number
    },
    listed_count: {
        type: Number
    },
    created_at: {
        type: String
    },
    favourites_count: {
        type: Number
    },
    utc_offset: {
        type: Number
    },
    time_zone: {
        type: String
    },
    geo_enabled: {
        type: Boolean
    },
    verified: {
        type: Boolean
    },
    statuses_count: {
        type: Number
    },
    lang: {
        type: String
    },
    contributors_enabled: {
        type: Boolean
    },
    is_translator: {
        type: Boolean
    },
    is_translation_enabled: {
        type: Boolean
    },
    profile_background_color: {
        type: String
    },
    profile_background_image_url: {
        type: String
    },
    profile_background_image_url_https: {
        type: String
    },
    profile_background_tile: {
        type: Boolean
    },
    profile_image_url: {
        type: String
    },
    profile_image_url_https: {
        type: String
    },
    profile_banner_url: {
        type: String
    },
    profile_link_color: {
        type: String
    },
    profile_sidebar_border_color: {
        type: String
    },
    profile_sidebar_fill_color: {
        type: String
    },
    profile_text_color: {
        type: String
    },
    profile_use_background_image: {
        type: Boolean
    },
    default_profile: {
        type: Boolean
    },
    default_profile_image: {
        type: Boolean
    },
    // following?: any;
    // follow_request_sent?: any;
    // notifications?: any;
});

const hashtagSchema = new mongoose.Schema({
    text: {
        type: String
    },
    indices: {
        type: [Number]
    },
});

const urlSchema = new mongoose.Schema({
    url: {
        type: String
    },
    expanded_url: {
        type: String
    },
    display_url: {
        type: String
    },
    indices: {
        type: [Number]
    },
});

const userMentionSchema = new mongoose.Schema({
    screen_name: {
        type: String
    },
    name: {
        type: String
    },
    id: {
        type: Number
    },
    id_str: {
        type: String
    },
    indices: {
        type: [Number]
    },
});

const thumbSchema = new mongoose.Schema({
    w: {
        type: Number
    },
    h: {
        type: Number
    },
    resize: {
        type: String
    },
});

const sizeSchema = new mongoose.Schema({
    thumb: {
        type: thumbSchema
    },
    small: {
        type: thumbSchema
    },
    medium: {
        type: thumbSchema
    },
    large: {
        type: thumbSchema
    },
});

const mediaSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    id_str: {
        type: String
    },
    indices: {
        type: [Number]
    },
    media_url: {
        type: String
    },
    media_url_https: {
        type: String
    },
    url: {
        type: String
    },
    display_url: {
        type: String
    },
    expanded_url: {
        type: String
    },
    type: {
        type: String
    },
    sizes: {
        type: sizeSchema
    },
});

const entitiesSchema = new mongoose.Schema({
    hashtags: {
        type: [hashtagSchema]
    },
    symbols: {
        type: Array
    },
    urls: {
        type: [urlSchema]
    },
    user_mentions: {
        type: [userMentionSchema]
    },
    media: {
        type: [mediaSchema]
    },
});

const retweetedStatusSchema = new mongoose.Schema({
    created_at: {
        type: String
    },
    id: {
        type: Number
    },
    id_str: {
        type: String
    },
    text: {
        type: String
    },
    source: {
        type: String
    },
    truncated: {
        type: Boolean
    },
    in_reply_to_status_id: {
        type: Number
    },
    in_reply_to_status_id_str: {
        type: String
    },
    in_reply_to_user_id: {
        type: Number
    },
    in_reply_to_user_id_str: {
        type: String
    },
    in_reply_to_screen_name: {
        type: String
    },
    user: userSchema,
    geo: {
        type: Object
    },
    coordinates: {
        type: Object
    },
    place: {
        type: Object
    },
    contributors: {
        type: Array
    },
    retweet_count: {
        type: Number
    },
    favorite_count: {
        type: Number
    },
    entities: entitiesSchema,
    favorited: {
        type: Boolean
    },
    retweeted: {
        type: Boolean
    },
    possibly_sensitive: {
        type: Boolean
    },
    lang: {
        type: String
    },
});

const twittSchema = new mongoose.Schema({
    created_at: {
        type: String
    },
    id_str: {
        type: String
    },
    id: {
        type: Number
    },
    text: {
        type: String
    },
    source: {
        type: String
    },
    truncated: {
        type: Boolean
    },
    in_reply_to_status_id: {
        type: Number
    },
    in_reply_to_status_id_str: {
        type: String
    },
    in_reply_to_user_id: {
        type: Number
    },
    in_reply_to_user_id_str: {
        type: String
    },
    in_reply_to_screen_name: {
        type: String
    },
    user: userSchema,
    geo: {
        type: Object
    },
    coordinates: {
        type: Object
    },
    place: {
        type: Object
    },
    contributors: {
        type: Array
    },
    retweeted_status: {
        type: [retweetedStatusSchema]
    },
    retweet_count: {
        type: Number
    },
    favorite_count: {
        type: Number
    },
    entities: {
        type: entitiesSchema
    },
    favorited: {
        type: Boolean
    },
    retweeted: {
        type: Boolean
    },
    possibly_sensitive: {
        type: Boolean
    },
    filter_level: {
        type: String
    },
    lang: {
        type: String
    },
    big_data_keywords: {
        type: [String]
    }
});

module.exports = twittSchema;
