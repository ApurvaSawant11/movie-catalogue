const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=61387e203195e4d5331283e517f96852&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=61387e203195e4d5331283e517f96852&query="';

const main = document.querySelector('.main')
const form = document.querySelector('form')
const search = document.querySelector('#search')

getMovies(API_URL)

function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => showMovies(data.results));

}

function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach(movie => {
        const {
            title,
            release_date,
            vote_average,
            overview,
            poster_path
        } = movie;

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie')

        movieElement.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h2>${title}</h2>
                <span class="${findRatingColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `

        main.appendChild(movieElement)
    })

}

function findRatingColor(rating) {
    if (rating >= 8) {
        return "green";
    } else if (rating >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchInput = search.value;

    if (searchInput && searchInput !== '') {
        getMovies(SEARCH_API + searchInput)
        search.value = '';
    } else {
        window.location.reload()
    }
})