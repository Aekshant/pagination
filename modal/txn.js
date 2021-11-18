const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');


const txnSchema = new mongoose.Schema({

    Srcappcd : {
        type : String,
        required : false,
        min : 6,
        max: 255
    },
    RequestID : {
        type : String,
        required : false,
        min : 6,
        max: 255
    },
    Flag : {
        type : String,
        required : false,
        min : 6,
        max: 255
    },
    MessageId : {
        type : String,
        required : false,
        min : 6,
        max: 255
    },
    StatusCd : {
        type : String,
        required : false,
        min : 6,
        max: 255
    },
    StatusRem : {
        type : String,
        required : false,
        min : 6,
        max: 255
    },
    Master_Acc_No : {
        type : String,
        required : false,
        min : 6,
        max: 255
    },
    Remitt_Info : {
        type : String,
        required : false,
        min : 6,
        max: 255
    },
    Remit_Name : {
        type : String,
        required : false,
        min : 6,
        max: 600
    },
    Remit_Ifsc : {
        type: String,
        required: false,
        min : 6,
        max: 2048
    },
    Amount : {
        type: Number,
        required: false,
        min : 6,
        max: 2048
    },
    Txn_Ref_No : {
        type: Number,
        required: false
    },    
    Utr_No : {
        type: Number,
        required: false
    },    
    Pay_Mode : {
        type: String,
        required: false
    },    
    E_Coll_Acc_No : {
        type: String,
        required: false
    },    
    Remit_Ac_Nmbr : {
        type: Number,
        required: false
    },    
    Creditdateandtime : {
        type: Date,
        required: false
    },
    Creditdateandtimemilli : {
        type: Number,
        required: false
    },    
    REF1 : {
        type: String,
        required: false
    },    
    REF2 : {
        type: String,
        required: false
    },    
    REF3 : {
        type: String,
        required: false
    },    
    Txn_Date : {
        type: String,
        required: false
    },    
    Bene_Cust_Acname : {
        type: String,
        required: false
    },
    ErrorCode : {
        type: String,
        required: false
    },
    ErrorDesc : {
        type: String,
        required: false
    },
    sent : {
        type: Boolean,
        required: false,
        default: false
    },
    client : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createDate : {
        type: Date,
        default : Date.now
    }

},{ collection: "txn" }
);

module.exports = mongoose.model('txn', txnSchema);