/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  
'/': 'QponController.homepage',
'GET /qpon/create': 'QponController.create',
'POST /qpon/create': 'QponController.create',
'GET /qpon': 'QponController.list',
'GET /qpon/list': 'QponController.list',
'GET /qpon/json': 'QponController.json',
'GET /qpon/read/:id': 'QponController.read',
'GET /qpon/read/': 'QponController.homepage',
  
   
'DELETE /qpon/:id': 'QponController.delete',


'GET /qpon/update/:id': 'QponController.update', //update
//'POST /qpon/update/:id': 'QponController.update', //update
'PUT /qpon/:id': 'QponController.update',

'GET /qpon/search': 'QponController.search', //search and paginate
 

'GET /user': 'UserController.login', //login
'GET /user/login': 'UserController.login', //login
'GET /user/mLogin': 'UserController.mobileLogin', //mobilelogin
'POST /user/login': 'UserController.login', //login
'POST /user/mLogin': 'UserController.login', //login

'POST /user/logout': 'UserController.logout', //logout
'POST /qpon/user/logout': 'UserController.logout',
'POST /qpon/:id/user/logout': 'UserController.logout',
'POST /user/:id/user/logout': 'UserController.logout',

'GET /qpon/:id/master': 'QponController.populate',
'GET /user/:id/redeem': 'UserController.populate',
'GET /user/:id/redeem/mobile': 'UserController.mobilePopulate',

'GET /qpon/add': 'UserController.add',
'POST /qpon/read/:id/user/:id/redeem/add/:fk': 'UserController.add',
'POST /user/:id/redeem/add/:fk': 'UserController.add',
'POST /qpon/read/:id/user/:id/add/:fk': 'UserController.mobileAdd',
'POST /user/:id/redeem/remove/:fk': 'UserController.remove',


//'POST /qpon/redeem': 'UserController.add',

  
  
  


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
