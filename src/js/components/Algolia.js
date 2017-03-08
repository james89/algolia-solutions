import AlgoliaSearch from 'algoliasearch';
import AlgoliaSearchHelper from 'algoliasearch-helper';

const API_KEY = 'a7ce9b2cfe389e073605d61c2ae49973';
const APP_ID = 'CUAF7PQEXB';
const indexDb = 'Restaurants';

const client = AlgoliaSearch(APP_ID, API_KEY);
const helper = AlgoliaSearchHelper(client, indexDb, {
  hitsPerPage: 3,
  index: indexDb,
  facets: []
});


console.log('client', client);
console.log('helper', helper);


console.log(helper.setQuery('mexican').search());
console.log(helper.setQuery('italian').search());


console.log(helper.getState());
