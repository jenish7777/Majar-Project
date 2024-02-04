const User=require("../models/user")

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signup=async(req,res)=>{
    try{
    let {username,email,password}=req.body;
    let newUser=new User({email , username});
    let registeredUser=await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err)
        }
    })
    req.flash("success","Welcom to Wanderlust");
    res.redirect("/listings");
    }catch(e){
        req.flash("error",e.message)
        res.redirect("/signup")
    }  
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.login=async(req,res)=>{
        req.flash("success","Welcom back to WanderLust You are Login")
        let redirectUrl=res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl)
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you are logged out!")
        res.redirect("/listings")
    })

}