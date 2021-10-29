const mongoose = require('mongoose')
const schema = mongoose.Schema;

const linkschema = new schema({
    long: String,
    short: String
});

const Link= mongoose.model("links",linkschema);

module.exports=Link;
