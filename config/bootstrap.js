

module.exports.bootstrap = async function () {

  sails.bcrypt = require('bcryptjs');
  var salt = await sails.bcrypt.genSalt(10);

  //if (await Qpon.count() > 0) {
    //return generateUsers();
  //}

  await Qpon.createEach([
    { title: "Fried Chicken", restaurant: "Greyhound Cafe", region:"HK Island", mall:"IFC Mall",image:"https://wallpaperaccess.com/full/715534.jpg",quota:5,coins:100, date: "2020-10-08", detail:"I am test data 1"},
    { title: "Fried Beef", restaurant: "Mango Tree", region:"Kowloon", mall:"APM",image:"https://cookingwithdog.com/wp-content/uploads/2017/06/gyu-katsu-00.jpg" ,quota:6,coins:200, date: "2020-09-08", detail:"I am test data 2"},
    { title: "Fish & Chips", restaurant: "Yoogane", region:"New Territories", mall:"New Town Plaza",image:"https://treasurytoday.com/-/media/images/insight-and-analysis/short-reads/2019-10-03-mc-00__fish-chips-318844862__1920x1080.jpg",quota:5,coins:300, date: "2020-08-08", detail:"I am test data 3 "},
    { title: "Fried Noodles", restaurant: "Noodles King", region:"HK Island", mall:"Times Square",image:"https://s1.dmcdn.net/v/Lk98W1SWlyOgloKqU/x1080",quota:8,coins:400, date: "2020-07-08", detail:"I am test data 4"},
    { title: "Spicy Shrimp", restaurant: "Bubba Shrimp", region:"Kowloon", mall:"Elements",image:"https://moadrupalweb.blob.core.windows.net/moadrupalweb/original/5566_BubbaGump_HeroImage.jpg" ,quota:2,coins:500, date: "2020-06-08", detail:"I am test data 5"},
    { title: "Tonkatsu", restaurant: "Tokyo Tonkotsu", region:"New Territories", mall:"Tsuen Wan Plaza",image:"https://www.newotani.co.jp/fileadmin/res/tokyo/restaurant/fumizen/04.jpg",quota:3,coins:600, date: "2020-05-08", detail:"I am test data 6 "},
    { title: "Sukiyaki", restaurant: "Sukiyaki Mori", region:"HK Island", mall:"Pacific Place",image:"https://cookingwithdog.com/wp-content/uploads/2017/02/kansai-sukiyaki-00.jpg",quota:2,coins:1300, date: "2020-12-08", detail:"I am test data 7"},
    { title: "Takoyaki", restaurant: "JapanBoat", region:"Kowloon", mall:"Harbour City",image:"https://cookingwithdog.com/wp-content/uploads/2017/02/takoyaki-ebiyaki-15.jpg" ,quota:15,coins:300, date: "2020-11-08", detail:"I am test data 8"},
    { title: "Sushi", restaurant: "Super Omakase", region:"New Territories", mall:"Tsuen Wan Plaza",image:"https://byfood.b-cdn.net/api/public/assets/9292/content.png.jpg",quota:2,coins:2000, date: "2020-02-08", detail:"I am test data 9"},

    // etc.
  ]);

  return generateUsers();

  async function generateUsers() {

    if (await User.count() > 0) {
      return;
    }
    
    var hash = await sails.bcrypt.hash('123456', salt);

    await User.createEach([
    { username: "Martin", password: hash, role:"admin", },
    { username: "Kenny", password: hash, coins:1000, role:"member", },
    { username: "Daniel", password: hash, coins:1500, role:"member", },
    { username: "Mark", password: hash, coins:2000, role:"member", },
    { username: "Alan", password: hash, coins:2500, role:"member", },
    
    // etc.
    ]);

    const chicken = await Qpon.findOne({title: "Fried Chicken"});
    const beef = await Qpon.findOne({title: "Fried Beef"});
    const fishchips = await Qpon.findOne({title: "Fish & Chips"});
    const sushi = await Qpon.findOne({title: "Sushi"});
    const friednoodle = await Qpon.findOne({title: "Fried Noodles"});
    const shrimp = await Qpon.findOne({title: "Spicy Shrimp"});
    const Tonkatsu = await Qpon.findOne({title: "Tonkatsu"});
    const Sukiyaki = await Qpon.findOne({title: "Sukiyaki"});


    const Kenny = await User.findOne({username: "Kenny"});
    const Daniel = await User.findOne({username: "Daniel"});
    const Mark = await User.findOne({username: "Mark"});
    const Alan = await User.findOne({username: "Alan"});

     

    await User.addToCollection(Kenny.id, 'redeem').members([chicken.id, beef.id]);
    await User.addToCollection(Daniel.id, 'redeem').members([fishchips.id ,sushi.id]);
    await User.addToCollection(Mark.id, 'redeem').members([friednoodle.id ,shrimp.id ]);
    await User.addToCollection(Alan.id, 'redeem').members([Tonkatsu.id ,Sukiyaki.id ]);
    
  }
};
