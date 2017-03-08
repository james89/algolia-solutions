// config and dependencies
var fs = require('fs');
var json = require('./resources/dataset/restaurants_list.json');
var file = fs.readFileSync('./resources/dataset/restaurants_info.csv');
var algoliasearch = require('algoliasearch');
var dotenv = require('dotenv').load();
var client = algoliasearch("CUAF7PQEXB", process.env.ADMIN_API_KEY);


/*
merge and upload
*/

var data = file.toString().split('\n');

var dataObj = data.splice(1).map(function(el, idx){
    el = el.split(';')

    return {
      objectID: parseInt(el[0]),
      food_type: el[1],
      stars_count: el[2],
      reviews_count: el[3],
      neighborhood: el[4],
      phone_number: el[5],
      price_range: el[6],
      dining_style: el[7]
    }
})


// mind...blown.
var nativeMerge = json.map(function(o){
  var otherObj = dataObj.find(function(el){
      return el['objectID'] === o['objectID'];
  });
  return Object.assign({}, o, otherObj);
})



// upload
var index = client.initIndex('Restaurants');
index.addObjects(nativeMerge, function(err, content) {
  if (err) {
    console.error('error', err);
  } else {
    console.log(content)
  }
});
