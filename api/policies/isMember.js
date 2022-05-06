// isAdmin.js
module.exports = async function (req, res, proceed) {

    //const isUserAdmin = false;
    //console.log(req.session.role)
    if (req.session.username == 'Kenny' || req.session.username == 'Daniel' || req.session.username == 'Mark' || req.session.username == 'Alan') {
        
        return proceed();   //proceed to the next policy,
    }

    //--•
    // Otherwise, this request did not come from a logged-in user.
    //alert("You are not admin")
    return res.redirect('/'); //Error page
};