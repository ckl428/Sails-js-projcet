/**
 * QponController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */







module.exports = {
  //qpon create function 
  create: async function (req, res) {
    var everyones = await Qpon.find({
      sort: 'coins',
    });
    var thatUser = await User.find({username: req.session.username});
    
    
    if (req.method == "GET"){
      return res.view('qpon/create', {
        userData:thatUser,
        user:req.session.username,
    });
    }
    
    else if(req.method == "POST"){
    var qPon = await Qpon.create(req.body).fetch();
    return res.view('pages/homepage',{
      qpons: everyones,
      user:req.session.username,
      userData:thatUser

    })
    }
  

  },

  //generate json output
  json: async function (req, res) {

    var everyones = await Qpon.find();

    return res.json(everyones);
  },

  //show data by list
  list: async function (req, res) {
    var thatUser = await User.find({username: req.session.username});
    var everyones = await Qpon.find();
    
    return res.view('qpon/list', {
      qpons: everyones,
      user:req.session.username,
      userData:thatUser
    });
  },

  homepage: async function (req, res) {
    
    var everyones = await Qpon.find({
      sort: 'coins',
    });
    var thatUser = await User.find({username: req.session.username});
    

    return res.view('pages/homepage', {
      qpons: everyones,
      user:req.session.username,
      userData:thatUser
    });
  },


  //retrieve single data
  read: async function (req, res) {

    var thatQpon = await Qpon.findOne(req.params.id);
    if (!thatQpon) return res.notFound();
    //var thatUser = await User.findOne(req.session.id);

    var redeemQpon = await Qpon.findOne(req.params.id).populate("master");
    var thatUser = await User.find({username: req.session.username});
    return res.view('qpon/read', {
      qpon: thatQpon,
      userData:thatUser,
      user:req.session.username,
      qRedeem:redeemQpon
     
    });
    
    
    
  },

  //delete data
  delete: async function (req, res) {

    var deletedQpon = await Qpon.destroyOne(req.params.id);
    if (!deletedQpon) return res.notFound();
    if (req.wantsJSON){
      return res.status(204).send();	    // for ajax request
  } else {
      return res.redirect('/');			// for normal request
  }
   
  },

  //update data
  update: async function (req, res) {
    
    if (req.method == "GET") { //GET > Go to update page
      var thatUser = await User.find({username: req.session.username});
      
      var thatQpon = await Qpon.findOne(req.params.id);

      if (!thatQpon) return res.notFound();

      return res.view('qpon/update', {
        userData:thatUser,
        user:req.session.username,
        qpon: thatQpon
      });

    } else{ //POST > Finish the update process

      var updatedQpon = await Qpon.updateOne(req.params.id).set(req.query);
      sails.log.debug(req.param('id'))
      if (!updatedQpon) return res.notFound();

      if (req.wantsJSON){
        console.log("Update success")
        return res.status(204).send();	    // for ajax request
      }   else {
        console.log("Update fail")
        return res.redirect('/');			// for normal request
      }
      }
   
  },

  //search data
  search: async function (req, res) {
    //ajax request
    var limit = Math.max(req.query.limit, 2) || 2;
    var offset = Math.max(req.query.offset, 0) || 0;
   
    var whereClause = {};
    whereClause.region = req.query.region
    whereClause.mincoin = 0;
    if (!isNaN(req.query.mincoin))
      whereClause.mincoin = req.query.mincoin;
    whereClause.maxcoin = Number.MAX_VALUE;
    if (!isNaN(req.query.maxcoin))
      whereClause.maxcoin = req.query.maxcoin;
    var minDate = "1900-01-01"
    var maxDate = "2099-01-01"
    whereClause.date = req.query.date;
    if (typeof (req.query.date) == "undefined")
      whereClause.date = minDate

    
      
     
    
      if (req.wantsJSON) { //Ajax search
      var countRecordAjax = await Qpon.count({
          where: {
            region: whereClause.region,
            coins: {
              '>=': whereClause.mincoin,
              '<=': whereClause.maxcoin,
            },
            date: {
              '>=': whereClause.date,
              '<=': maxDate
            },
          },
        });
      await Qpon.update({})
      .set({
      count:countRecordAjax
      });
      var thoseQpons = await Qpon.find({
        where: {
          region: whereClause.region,
          coins: {
            '>=': whereClause.mincoin,
            '<=': whereClause.maxcoin,
          },
          date: {
            '>=': whereClause.date,
            '<=': maxDate
          },
        },
        sort: 'coins',
        limit: limit,
        skip: offset,
      });
     
      //console.log(thoseQpons)
      console.log("Ajax" + countRecordAjax)
      thoseQpons = res.json(thoseQpons)
      return [thoseQpons] //return to client as json format
    } 
    var countRecordNonAjax = await Qpon.count({
      where: {
        region: whereClause.region,
        coins: {
          '>=': whereClause.mincoin,
          '<=': whereClause.maxcoin,
        },
        date: {
          '>=': whereClause.date,
          '<=': maxDate
        },
      },
    });
    var thatUser = await User.find({username: req.session.username});
    console.log("Non Ajax" + countRecordNonAjax)
    return res.view('qpon/search', {
      numOfRecords: countRecordNonAjax,
      userData:thatUser,
      user:req.session.username,
    });
  },
  populate: async function (req, res) {
    var thatUser = await User.find({username: req.session.username});
    var thatQpon = await Qpon.findOne(req.params.id).populate("master");

    if (!thatQpon) return res.notFound();

    return res.view('qpon/redeemlist', {
      qpon:thatQpon,
      userData:thatUser,
      user:req.session.username,
    });
  },

  
};
