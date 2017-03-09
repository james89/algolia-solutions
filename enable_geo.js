var algoliasearch = require('algoliasearch');
var dotenv = require('dotenv').load();
var client = algoliasearch("CUAF7PQEXB", process.env.ADMIN_API_KEY);
var index = client.initIndex('Restaurants');

index.setSettings({'ranking': ['geo']}, (result)=>{
console.log(result)
})
