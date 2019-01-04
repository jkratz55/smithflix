import movies from '../data/movies';

export default {
    searchFields: ['title', 'original_title', 'overview'],
    filteredMovies: [],

    filterMovies(filter) {
        this.filterByGenres(filter.genres);
        this.filterBySearchTerm(filter.searchTerm);

        return this.filteredMovies;
    },

    filterByGenres(genres) {
        this.filteredMovies = genres.length > 0 
            ? movies.filter(movie => {
                let isGenre = false

                genres.forEach(genre => {
                    if(movie.genre_ids.includes(genre))
                        isGenre = true;
                });

                return isGenre;
            }) 
            : movies;    
    },

    filterBySearchTerm(searchTerm) {
        if (!searchTerm) return;        

        let term = searchTerm.toString().toLowerCase();

        this.filteredMovies = this.filteredMovies.filter(movie => {
            let foundMovie = false
            this.searchFields.forEach(prop => {
                let value = movie[prop].toString().toLowerCase();
                if (value.includes(term))
                    foundMovie = true;
            });
            
            return foundMovie;
        });
    }
}