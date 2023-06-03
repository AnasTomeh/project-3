
import fetch from "node-fetch";
import {readFile, writeOnFile} from "./fileHandler.js";

export const fetchData = async () => {

    try {
        const response = await fetch('https://imdb-top-100-movies.p.rapidapi.com/', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '82353522b4msh521d18aeb22139fp1f42afjsn96ff3d77b66e',
                'Authorization1': '45e80bfa9emshe6eb22b91137cb8p1cf9bajsnead46fa1a878',
            },
        })

        const data = await response.json()
        if (data.message) {
            console.log(data.message)
        }

        if (!data.message) {
            const movies = await readFile()
            let newMovies = data.map((obj, key) => ({
                id: movies[movies.length-1].id+key+1,
                title: obj.title,
                director: obj.director.join(','),
                release_year: obj.release_year,
                genre: obj.genre.join(','),
                plot: obj.description
            }))

            movies.push(...newMovies)
            let jsonContent = JSON.stringify(movies,null, 2)

            writeOnFile(jsonContent)
            console.log(`a total of ${newMovies.length} Movies has been added successfully`)
        }
    } catch (err) {
        console.error(err)
    }
}


