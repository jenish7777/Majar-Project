const mongoose=require("mongoose")
const initData=require("./data")
const Listing=require("../models/listing.js")
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
 }
 main().then(
     ()=>{
         console.log("connect to db")
     }
 ).catch((err)=>{
     console.log(err)
 })
 

 const initDB=async ()=>{
   await Listing.deleteMany({});
   data=initData.data.map((obj)=>({...obj,Owner:"65b9b547cd74936b0ba6c36f",}));
   await Listing.insertMany(data)
   console.log("data was initialzed.....")

 }

 initDB();