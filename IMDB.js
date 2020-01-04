/*
1) using IMDB API please showcase how would you present all the movies from 1977 to 1992
(if it is possible, if not please filter according to your wishes via API)

required packages:
npm install imdb-api

- this api does not allow to have a big amount of results, so I had to filter them by the name parameter

*/
const imdb = require('imdb-api');
apiKey = {
    apiKey: '670c069c'
}

for (var i = 1977; i <= 1992; i++) {
  imdb.search({name: 'dog', type: 'movie', year: i}, apiKey)
  .then((search) => {
    for (const result of search.results) {
      console.log(result.title);
    }
  })
  .catch(console.log);
}
