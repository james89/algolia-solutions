import AlgoliaSearch from 'algoliasearch';
import AlgoliaSearchHelper from 'algoliasearch-helper';

/*
config
*/
const API_KEY = 'a7ce9b2cfe389e073605d61c2ae49973';
const APP_ID = 'CUAF7PQEXB';
const indexDb = 'Restaurants';
const client = AlgoliaSearch(APP_ID, API_KEY);
const index = client.initIndex(indexDb);


/*
helper and utility methods
*/
export const helper = AlgoliaSearchHelper(client, indexDb, {
  hitsPerPage: 3,
  facets: ['food_type', 'stars_count', 'payment_options']
});

// 403 forbidden?
// index.setSettings({'customRanking': ['geo']}, (err)=>{
//   if (!err) {
//     console.log('geo ranking set up!');
//   }
// })



console.log('client', client);
console.log('helper', helper);
