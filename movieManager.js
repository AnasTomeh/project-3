import {readFile, writeOnFile} from "./fileHandler.js";
import Movie from "./modules.js";
import {MovieInfoType} from "./types.js";


export const listAllOfMovies = async () => {
    try {
        return   await readFile()

    } catch (err) {
        console.error(err)
    }
}

export const addNewMovie = async (title, director, release_year, genre, plot) => {

    try {
        const movies = await readFile()
        let id = movies[movies.length-1].id+1
        const newMovie = new Movie(id,title, director, release_year, genre, plot);
        movies.push(newMovie);

        const jsonContent = JSON.stringify(movies, null, 4);

        writeOnFile(jsonContent)
        console.log(`Movie with title: ${title} has been added to movies.json successfully`)
    } catch (err) {
        console.log(`Error parsing JSON string: ${err}`);
    }
}

export const filteringMovies = async (type,input , movies) => {
    try {
        const regex = new RegExp(input, "i")

        if (type === MovieInfoType.DIRECTOR) {
            const result = movies.filter(obj =>  regex.test(obj.director));
            if (result.length === 0) {
                console.log(`No movies in this filter`)
            }
            result.map(ele => {
                console.log(`Movie Title: ${ele.title} , Director: ${ele.director}, Release Year: ${ele.release_year}`)
            });
        }
        else if (type === MovieInfoType.RELEASE_YEAR) {
            const result = movies.filter(obj => regex.test(obj.release_year));
            if (result.length === 0) {
                console.log(`No movies in this filter`)
            }
            result.map(ele => {
                console.log(`Movie Title: ${ele.title} , Director: ${ele.director}, Release Year: ${ele.release_year}`)
            })
        }
        else if (type === MovieInfoType.GENRE) {
            const result = movies.filter(obj =>  regex.test(obj.genre));
            if (result.length === 0) {
                console.log(`No movies in this filter`)
            }
            result.map(ele => {
                console.log(`Movie Title: ${ele.title} , Director: ${ele.director}, Release Year: ${ele.release_year}`)
            })
        }


    } catch (err) {
        console.log(`Error parsing JSON string: ${err}`);
    }
}

export const searchMovies = async (type,input) => {
    const movies = await readFile()
    const searchResults = []

       if (type === MovieInfoType.ALL_RESULTS) {
           for (let i = 0; i < movies.length; i++) {
               if (movies[i].title.toLowerCase().includes(input.toLowerCase()) || movies[i].director.toLowerCase().includes(input.toLowerCase()) || movies[i].genre.toLowerCase().includes(input.toLowerCase()) || movies[i].release_year === input ) {
                   searchResults.push(movies[i])
               }
           }
       }
       else if (type === MovieInfoType.TITLE) {
           for (let i = 0; i < movies.length; i++) {
               if (movies[i].title.toLowerCase().includes(input.toLowerCase()) ) {
                   searchResults.push(movies[i])
               }
           }
       }
       else if (type === MovieInfoType.DIRECTOR) {
           for (let i = 0; i < movies.length; i++) {
               if ( movies[i].director.toLowerCase().includes(input.toLowerCase()) ) {
                   searchResults.push(movies[i])
               }
           }
       }
       else if (type === MovieInfoType.GENRE) {
           for (let i = 0; i < movies.length; i++) {
               if ( movies[i].genre.toLowerCase().includes(input.toLowerCase())) {
                   searchResults.push(movies[i])
               }
           }
       }
       else if (type === MovieInfoType.RELEASE_YEAR) {
           for (let i = 0; i < movies.length; i++) {
               if ( movies[i].release_year === input) {
                   searchResults.push(movies[i])
               }
           }
       }

    return searchResults ;
}


export const updateMovie = async (id, title,director,release_year,genre) => {

    try {
        const movies = await readFile()

        const result = movies.find(obj => obj.id === id);
        if (!result) {
            console.log('Movie not Found')
            return
        }
        result.title = title ? title : result.title
        result.director = director ? director : result.director
        result.release_year = release_year ? release_year : result.release_year
        result.genre = genre ? genre : result.genre
        let jsonContent = JSON.stringify(movies, null, 2)
        writeOnFile(jsonContent)

        console.log(`Movie with ID: ${id} has been updated successfully`);

    } catch (err) {
        console.log(`Error parsing JSON string: ${err}`);
    }
}

export const deleteMovie = async (input) => {

    try {
        const movies = await readFile()

        const index = movies.findIndex(movie => movie.id === parseInt(input));
        if (index === -1) {
            console.log('movie not found')
        }
        if (index !== -1) {
            console.log(`Movie with title ${movies[index].title} and ID: ${movies[index].id} is deleted successfully`)
            movies.splice(index, 1);
            let jsonContent = JSON.stringify(movies, null, 2)
            writeOnFile(jsonContent)
        }
    } catch (err) {
        console.log(`Error parsing JSON string: ${err}`);
    }
}

