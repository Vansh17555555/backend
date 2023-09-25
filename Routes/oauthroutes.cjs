const router=require('express').Router();
const passport=require('passport');

router.get('/logout',(req,res)=>{
    res.status(200).json({
        message:"logging out"
    })
})
router.get('/login',passport.authenticate('google',{
    scope:['profile']
}))
router.get('/google/callback',passport.authenticate('google',{scope:['profile','email']}),(req,res)=>{
    res.status(200).json({message:"you reached the callback URI"})
})
router.get('/logout', (req, res) => {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      // If using sessions, you can destroy the session
      req.logout(); // This will clear the user's session
  
      // Optionally, you can revoke OAuth tokens here if applicable
      // You may need to call your OAuth provider's API to revoke tokens
  
      // Redirect the user to the home page or a post-logout page
      res.redirect('/');
    } else {
      // If the user is not authenticated, simply redirect to the home page
      res.redirect('/');
    }
  });
  
module.exports=router;