/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */








module.exports = {
    login: async function (req, res) {

        var thatUser = await User.find({username: req.session.username});
        
        if (req.method == "GET") return res.view('user/login', {
            userData:thatUser,
            user:req.session.username,
        }); 
    
        if (!req.body.username || !req.body.password) return res.badRequest(); //empty?
    
        var user = await User.findOne({ username: req.body.username.replace(/\s+/g,'') });
    
        if (!user) return res.status(401).json("User not found");
        
        //encrypted user input eg '123456' to encrypted data
        //first = user input ,second = userdata in database 
        var match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).json("Wrong Password");
        
        //if (user.password != req.body.password) 
        //  return res.status(401).json("Wrong Password");
    
        
        // Reuse existing session 
        if (!req.session.username) {
            req.session.username = user.username; 
            return res.json(user);
        }
        
        // Start a new session for the new login user
        req.session.regenerate(function (err) {
    
            if (err) return res.serverError(err);
    
            req.session.username = user.username;   
            return res.json(user);
        });
    },
    mobileLogin: async function (req, res) {

        var thatUser = await User.find({username: req.session.username});
        var allUser = await User.find();
        
        if (req.method == "GET") 
        return res.json(allUser)
        
        
        
        if (!req.body.username || !req.body.password) return res.badRequest(); //empty?
        var user = await User.findOne({ username: req.body.username.replace(/\s+/g,'') });
    
        if (!user) return res.status(401).json("User not found");
        
        //encrypted user input eg '123456' to encrypted data
        //first = user input ,second = userdata in database 
        var match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).json("Wrong Password");
        
       
        
        // Reuse existing session 
        if (!req.session.username) {
            req.session.username = user.username; 
            return res.json(user);
        }
        
        // Start a new session for the new login user
        req.session.regenerate(function (err) {
    
            if (err) return res.serverError(err);
    
            req.session.username = user.username;   
            return res.json(user);
        });
    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {
        
            if (err) return res.serverError(err);
            //console.log(req.session.username)
            return res.redirect("/")        
        });
    },

    populate: async function (req, res) {

        var redUser = await User.findOne(req.params.id).populate("redeem");
        
        var thatUser = await User.find({
            username: req.session.username,
        });
        if (!redUser) return res.notFound();
      

  
        return res.view('qpon/myredeem', {
            redeemUser:redUser,
            userData:thatUser,
            user:req.session.username,    
        });

        return res.json(redUser)
    },

    mobilePopulate: async function (req, res) {

        
       
        var redUser = await User.findOne(req.params.id).populate("redeem");
        if (!redUser){ 
            console.log("Populate unsuccess")
            return res.notFound();
        }
        
        return res.json(redUser.redeem);
    },

    add: async function (req, res) {
        
        if (!await User.findOne(req.params.id)) {
        
        return res.redirect("http://localhost:1337/user/login");
        }
        //console.log(req.params.id)
        var thatUser = await User.findOne(req.params.id)
        if(!thatUser) return res.redirect("http://localhost:1337/user/login");
        var thatQpon = await Qpon.findOne(req.params.fk).populate("master", {id: req.params.id});
        if (!thatQpon) return res.redirect("/");

        if (thatUser.coins < thatQpon.coins) return res.redirect("http://localhost:1337/qpon/read/"+req.params.fk);
        
        if (thatQpon.master.length > 0)
            return res.redirect("/");   // conflict
        
       
      
        console.log("Before adding " + thatQpon.quota)
        if(thatQpon.quota<=0){
         return res.redirect("/");
        }

        var updatedCoins = await User.updateOne(req.params.id).set(({
            coins: thatUser.coins- thatQpon.coins
           }));
        var updatedQuota = await Qpon.updateOne(req.params.fk).set(({
            quota: thatQpon.quota-1
        }));

        await User.addToCollection(req.params.id, "redeem").members(req.params.fk);
        console.log("everythings done" + " After adding " + updatedQuota.quota)
        return res.redirect("/");
    },

    mobileAdd: async function (req, res) {
        
        if (!await User.findOne(req.params.id)) {
        
        return res.redirect("http://localhost:1337/user/login");
        }
        //console.log(req.params.id)
        var thatUser = await User.findOne(req.params.id)
        if(!thatUser) return res.redirect("http://localhost:1337/user/login");
        var thatQpon = await Qpon.findOne(req.params.fk).populate("master", {id: req.params.id});
        if (!thatQpon) return res.redirect("/");

        if (thatUser.coins < thatQpon.coins) return res.redirect("http://localhost:1337/qpon/read/"+req.params.fk);
        
        if (thatQpon.master.length > 0)
            return res.redirect("/");   // conflict
        
       
      
        console.log("Before adding " + thatQpon.quota)
        if(thatQpon.quota<=0){
         return res.redirect("/");
        }

        var updatedCoins = await User.updateOne(req.params.id).set(({
            coins: thatUser.coins- thatQpon.coins
           }));
        var updatedQuota = await Qpon.updateOne(req.params.fk).set(({
            quota: thatQpon.quota-1
        }));

        await User.addToCollection(req.params.id, "redeem").members(req.params.fk);
        console.log("everythings done" + " After adding " + updatedQuota.quota)
        return res.json(thatQpon);
    },

    remove: async function (req, res) {

        if (!await User.findOne(req.params.id)) return res.redirect("/");
        var thatUser = await User.findOne(req.params.id)
        var thatQpon = await Qpon.findOne(req.params.fk).populate("master", {id: req.params.id});
        if (!thatQpon) return res.status(404).json("Qpon not found.");
        if (thatQpon.master.length == 0)
            return res.status(409).json("Nothing to delete.");
            
        var updatedCoins = await User.updateOne(req.params.id).set(({
            coins: thatUser.coins + thatQpon.coins
        }));
        var updatedQuota = await Qpon.updateOne(req.params.fk).set(({
            quota: thatQpon.quota+1
         }));
    
        await User.removeFromCollection(req.params.id, "redeem").members(req.params.fk);
        return res.redirect("/");
    },

   

};

