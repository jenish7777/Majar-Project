const express=require("express")
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js")
const Review=require("../models/review.js")
const Listing=require("../models/listing.js")
const {isLoggedIn,validateReview,isReviewAuthor}=require("../middleware.js")

const reviewController=require("../controllers/reviews.js")

//Reviews Rout
router.post("/",isLoggedIn,wrapAsync(reviewController.createReview));

//Delete review rout
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview))

module.exports=router;