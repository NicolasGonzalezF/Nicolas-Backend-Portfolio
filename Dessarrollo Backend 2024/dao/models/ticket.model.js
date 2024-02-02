import mongoose from 'mongoose'

const {Schema,model}=mongoose;

const ticketSchema =new Schema({
    code:{type:String,required:true},
    purchase_datetime: {type:String,required:true},
    amount: {type:Number,default: 0},
    purchaser: {type:String,required:true},
});

const ticketModel= model ("Ticket",ticketSchema);

export default ticketModel;