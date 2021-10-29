// implementing the modules

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const connectDB = require('./config/db');
const generate = require('./short')
const Link = require('./model/link')

// for pug file 
app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static('public'));

// PORT
const port = 8080;


//connecting database
connectDB(); 

// for post method

app.use(bodyparser.urlencoded({ extended: false }));

// home page

app.get('/',(req,res) => {
        res.render('home')
});

// response page

app.post('/',addDB,async (req,res) => {

    var shortl = req.hostname + ':' + port + '/' + req.body.shorted

    res.render('res',{res:shortl});
});

// requesting the shortened url 

app.get('/:para', async (req , res) => {
    var id= req.params.para 
    var wid =await Link.findOne({short: id},{long :1,_id:0});
    res.redirect(wid.long);
})

async function addDB(req, res,next){
    const shorted= await generate();
    req.body.shorted = shorted;
    await Link.create({
        long: req.body.url,
        short: shorted
    });
    next();
}


app.listen(port);