const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const _PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const queryString = require('query-string');
const Txn = require("./modal/txn");

mongoose.connect(process.env.mongo,
    { useNewUrlParser: true, useUnifiedTopology: true, },
    (err) => {
        if(!err) console.log('MongoDB Connection')
        else console.log(err)
    })
app.use(express.json({limit: '1mb'}))
app.use(express.urlencoded({limit: '1mb',extended: false }));
app.options('*', cors())
// CORS
app.use(cors({
    origin: '*', //192.168.43.121,
    methods: "GET,POST"
}))

app.get('/txn',paginatedData(Txn),(req,res)=>{
       Txn.aggregate([{$match:{}},
            {$group:{"_id":"611fda5cd7c8a645a40f67b5",total:{$sum:"$Amount"}}}
        ]).then((result) => {
            console.log(result);
          })

    res.json(res.paginatedResult)
});

function paginatedData(model){
    return async(req,res,next) => {
        const page = parseInt(req.query.page)

        const limit =parseInt(req.query.limit)
        const startIndex = (page - 1 ) * limit;
        const endIndex = page * limit;
        
        const results = {}
        const totalAmount = {}
        if(startIndex > 0){
        results.previous = {
            page: page - 1,
            limit:limit
        }
    }
        if(endIndex < await model.countDocuments().exec()){
        results.next ={
            page:page + 1,
            limit:limit
        }
    }
   /* var i;
    for(i=startIndex;i <=endIndex; i++ ){
        
    } */

    try{
        results.result = await model.find().sort({createDate: -1}).limit(limit).skip(startIndex).exec()
        res.paginatedResult = {results}
        next();
    }catch(e){
        res.status(500).json({message:e.message})
    }
       
    }
}
const axios = require('axios').default;
var cron = require('node-cron');
var counter =0;
cron.schedule('*/1 * * * * *', async () => {
    return;
    let date_ob = new Date(); 
    counter ++;
    const Transaction = new Txn({
        Amount: counter,
        client: ObjectID("611fda5cd7c8a645a40f67b5"),
    });
    try {
        let ClientClient = await Transaction.save();
        console.log(ClientClient);
        return res.status(200).json({ status: true, data: ClientClient, message: "Registration Successfull!" });
        
        // return res.status(200).json({ status: true, data: Client._id, message: "Registration Successfull!" });
    } catch (err) {
        console.log(err)
        return res.status(200).json({ status: false, message: err })
    }
});
app.listen(_PORT, () => {
    console.log(`App started and Listening on port ${_PORT}`)
});
