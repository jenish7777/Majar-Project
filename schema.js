const joi=require("joi")

const listingSchema=joi.object({
    listing: joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.number().required(),
    }).required()
})

module.exports.reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().required(),
        comment:joi.string().required()
    }).required()
})

module.exports=listingSchema