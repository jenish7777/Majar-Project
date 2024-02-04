let mongoose=require("mongoose")
let Schema=mongoose.Schema;
const Review=require("./review.js")

let listingSchema=new Schema({
    title:{
        type:String,
        requried:true
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    Owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})


listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }
})
let Listing=mongoose.model("Listing",listingSchema)

module.exports=(Listing);