/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    username: {
      type: "string",
      unique: true,
      required: true
    },
    
    password: {
      type: "string"
    },

    coins:{
      type:"number"

    },
    role: {
      type: 'string',
      isIn: ['visitor', 'member', 'admin'],
      defaultsTo: 'visitor'
    },
    redeem: {
      collection: 'Qpon',
      via: 'master'
    },
  },  
  customToJSON: function() {
    // Return a shallow copy of this record with the password removed.
    return _.omit(this, ['password'])
  },

};

