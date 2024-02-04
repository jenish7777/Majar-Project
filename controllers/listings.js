const Listing=require("../models/listing")


module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({})
    res.render("listings/index",{allListings})
}

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/New")    
}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({path:"reviews",populate:{path:"author",},})
    .populate("Owner");
    if(!listing){
     req.flash("error","Listing you requested for does not exit");
     res.redirect("/listings")
    }
    res.render("listings/show",{listing})
 }
 
module.exports.createListing=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    let listing=req.body.listing;
    let newlisting=new Listing(listing);
    newlisting.Owner=req.user._id;
    newlisting.image={url,filename};
    await newlisting.save();
    req.flash("success","New listing Created");
    res.redirect("/listings");
}

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exit");
        res.redirect("/listings")
       }
    let orignalImageUrl=listing.image.url;
    orignalImageUrl=orignalImageUrl.replace("/upload", "/upload/w_250")
    res.render("listings/Edit",{listing,orignalImageUrl})
}

module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let listings=req.body.listing;
    let listing=await Listing.findByIdAndUpdate(id,listings);

    if(typeof req.file !=='undefined'){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename}
        await listing.save()
    }   
    req.flash("success"," Listing Updated");
    res.redirect(`/listings/${id}`)
}

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id)
    req.flash("success","Listing Deleted")
    res.redirect("/listings")
}