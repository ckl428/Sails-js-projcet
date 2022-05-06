// isAdmin.js
module.exports = async function (req, res, proceed) {

    //const isUserAdmin = false;

    if (req.session.username == 'Martin' ) {
        
        return proceed();   //proceed to the next policy,
    }

    //--•
    // Otherwise, this request did not come from a logged-in user.
    //alert("You are not admin")
    else{
        
        return res.redirect('/');
    }//Error page
};