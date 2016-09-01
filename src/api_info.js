'use strict';

module.exports = {
  baseUrl: 'https://api.themoviedb.org/3/',
  key: process.env.MOVIEDB_API_KEY,
  popular: 'person/popular',
  page: '&page=',
  person: 'person/',
  movie: 'movie/',
  keyString: '?api_key=',
  movieCreditsString: '&append_to_response=movie_credits',
  creditsString: '&append_to_response=credits',
  getPopular: function() {
    return this.baseUrl + this.popular + this.keyString + this.key + this.page + '1';
  },
  getActor: function(id) {
    return this.baseUrl + this.person + id + this.keyString + this.key + this.movieCreditsString;
  },
  getMovie: function(id) {
    return this.baseUrl + this.movie + id + this.keyString + this.key + this.creditsString;
  }
};
