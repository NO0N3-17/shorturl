const shortid = require('shortid');
const links= require('./model/link');
var generat = shortid.generate();

const connectDB = require('./config/db');


const values = async () => {
    const arr = await links.find({});
    const usedarr = arr.map(obj => obj.short)
    console.log(usedarr.includes(generat));
    while(usedarr.includes(generat)){
        generat = shortid.generate();
    }
    
    return generat;
    
}

// const shortedid= values();

module.exports=values;