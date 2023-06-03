
export default class Movie {
    id;
    title;
    director;
    release_year;
    genre;
    plot;

    constructor(id,title, director, release_year, genre, plot) {
        this.id = id
        this.title = title;
        this.director = director;
        this.release_year = release_year;
        this.genre = genre;
        this.plot = plot
    }

}


