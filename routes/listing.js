const express=require("express")
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const Listing=require("../models/listing.js")
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js")
const listingController=require("../controllers/listings.js")
const multer=require("multer")
const {storage}=require("../cloudeConfing.js")
const upload=multer({storage})

router
.route("/")
//index Route
.get(wrapAsync(listingController.index))
//Create Route
.post(
    isLoggedIn,
    upload.single("listing[image][url]"),
    wrapAsync(listingController.createListing)
);


//New route
router.get("/new",isLoggedIn,wrapAsync(listingController.renderNewForm))


router
.route("/:id")
//show route
.get(wrapAsync(listingController.showListing))
//Update Route
.put(isLoggedIn,isOwner,upload.single("listing[image][url]"),wrapAsync(listingController.updateListing))
//delete route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));





///edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));



module.exports=router;