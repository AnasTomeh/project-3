import * as readline from "readline";
import {addNewMovie, deleteMovie, filteringMovies, listAllOfMovies, searchMovies, updateMovie} from "./movieManager.js";
import {fetchData} from "./apiRequest.js";
import {MovieInfoType} from "./types.js";

const cmd = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const main = () => {
    cmd.question(`Please Choose Number : \n
1 : List all of Movies
2: Add new Movie,
3: Update Movie Details
4: Delete Movie
5: Search for Movie
6: Fetch more Movies from api
0: Close the app
`, async (input) => {
        if (input !== '1' && input !== '2' && input !== '3' && input !== '4' && input !== '5' && input !== '6' && input !== '0') {
            console.log('invalid input')
            setTimeout(() => {
                main()
            }, 1000)
        }
        else if (input === '1') {
            const result = await listAllOfMovies()
            console.log(`Total of ${result.length} movies is found :`)
            result.map((ele, key) => {
                console.log(`${key} - ${ele.title} (${ele.release_year}) for ${ele.director}`)
            })

            cmd.question('Do you want to sort the result y/n \n' , (input) => {
                if (input === 'n') {
                    backToMainMenu()
                }
                else if (input === 'y') {
                    cmd.question(`please choose sort type number \n
                    1 : by Title alphabetically
                    2: by Director Name alphabetically,
                    3: by Release Year
                    4: genre \n`, (input) => {
                        if (input === '1') {
                            let sort = result.sort((a, b) => {
                                const objA = a.title.toLowerCase();
                                const objB = b.title.toLowerCase();
                                if (objA < objB) {
                                    return -1;
                                }
                                if (objA > objB) {
                                    return 1;
                                }
                                return 0;
                            })
                            sort.map((ele, key) => {
                                console.log(`${key} - ${ele.title} (${ele.release_year}) for ${ele.director}`)
                            })
                            backToMainMenu()
                        }
                        else if (input === '2') {
                            let sort = result.sort((a, b) => {
                                const objA = a.director.toLowerCase();
                                const objB = b.director.toLowerCase();
                                if (objA < objB) {
                                    return -1;
                                }
                                if (objA > objB) {
                                    return 1;
                                }
                                return 0;
                            })
                            sort.map((ele, key) => {
                                console.log(`${key} - ${ele.title} (${ele.release_year}) for ${ele.director}`)
                            })
                            backToMainMenu()
                        }
                        else if (input === '3') {
                            let sort = result.sort((a, b) => {
                                return parseInt(a.release_year) - parseInt(b.release_year)
                            })
                            sort.map((ele, key) => {
                                console.log(`${key} - ${ele.title} (${ele.release_year}) for ${ele.director}`)
                            })
                            backToMainMenu()
                        }
                        else if (input === '4') {
                            let sort = result.sort((a, b) => {
                                const objA = a.genre.toLowerCase();
                                const objB = b.genre.toLowerCase();
                                if (objA < objB) {
                                    return -1;
                                }
                                if (objA > objB) {
                                    return 1;
                                }
                                return 0;
                            })
                            sort.map((ele, key) => {
                                console.log(`${key} - ${ele.title} (${ele.release_year}) for ${ele.director}`)
                            })
                            backToMainMenu()
                        }
                    })
                }
            })
            backToMainMenu()
        }
        else if (input === '2') {
            let inputs = []
            cmd.question('please enter Movie Title \n', (input) => {
                inputs.push(input)
                cmd.question('please enter movie director name \n', (input) => {
                    inputs.push(input)
                    cmd.question('please enter movie release year \n', (input) => {
                        inputs.push(input)
                        cmd.question('please enter movie genre \n', (input) => {
                            inputs.push(input)
                            cmd.question('please enter movie plot \n', (input) => {
                                inputs.push(input)
                                addNewMovie(...inputs).then(x => {
                                    backToMainMenu()
                                })
                            })
                        })
                    })
                })
            })
        }
        else if (input === '3') {
            let inputs = []
            cmd.question('Please enter the movie Id you want to update \n', (input) => {

                inputs.push(parseInt(input))
                cmd.question('please enter Movie Title \n', (input) => {
                    inputs.push(input)
                    cmd.question('please enter movie director name \n', (input) => {
                        inputs.push(input)
                        cmd.question('please enter movie release year \n', (input) => {
                            inputs.push(input)
                            cmd.question('please enter movie genre \n', (input) => {
                                inputs.push(input)
                                cmd.question('please enter movie plot \n', (input) => {
                                    inputs.push(input)
                                    updateMovie(...inputs).then(x => {
                                        backToMainMenu()
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
        else if (input === '4') {
            cmd.question(`please enter the movie id you want to delete \n`, (input) => {
                deleteMovie(parseInt(input)).then(x => {
                        backToMainMenu()
                    }
                )
            })
        }
        else if (input === '5') {
            userSearch()
        }
        else if (input === '6') {
            fetchData().then(x => {
                backToMainMenu()
            })
        }
        else if (input === '0') {
            cmd.close()
        }
    })
}
const  backToMainMenu =  () => {
    cmd.question('Please Enter 9 to back to main menu \n', (input) => {
        if (input === '9') {
            console.log('invalid input !!')
            main()
        }
    })
}

const filterOption =  (result) => {
    cmd.question('Do you want to filter these movies y/n \n', (input) => {
        if (input !== 'n' && input !== 'y') {
            console.log('invalid input !!')
            filterOption(result)
        }
        if (input === 'n') {
            backToMainMenu()
        }
        else if (input === 'y') {
            cmd.question(`Please choose filter by type: \n 
                            1: by Director Name
                            2: by Release Year
                            3: by Genre
                            4: back to main menu \n`,  (input) => {
                if (input !== '1' && input !== '2'&& input !== '3' && input !== '4') {
                     console.log('invalid input !!')
                    filterOption(result)
                }
                if (input === '1') {
                    cmd.question('please enter directory name \n', async (input) => {
                        await filteringMovies(MovieInfoType.DIRECTOR, input, result)
                        backToMainMenu()
                    })
                }
                if (input === '2') {
                    cmd.question('please enter release year \n', async (input) => {
                        await filteringMovies(MovieInfoType.RELEASE_YEAR, input, result)
                        backToMainMenu()
                    })
                }
                if (input === '3') {
                    cmd.question('please enter genre \n', async (input) => {
                        await filteringMovies(MovieInfoType.GENRE, input, result)
                        backToMainMenu()
                    })
                }
                if (input === '4') {
                    main()
                }
            })
        }
    })
}

const userSearch = () => {
    cmd.question(`Please choose number of search type : \n 
           1: search for all results.
           2: search by title.
           3: search by director name.
           4: search by release year.
           5: search by genre.
           6: back to main menu \n`, (input) => {

        if (input !== '1' && input !== '2'&& input !== '3' && input !== '4'&& input !== '5' && input !== '6') {
            console.log('invalid input')
            userSearch()
        }

        else if (input === '1') {
            cmd.question('please enter word to search for \n', async (input) => {
                const result = await searchMovies(MovieInfoType.ALL_RESULTS, input)
                console.log(`Total of ${result.length} movies is found :`)
                result.map(ele => {
                    console.log(`Movie Title: ${ele.title} , Director: ${ele.director}, Release Year: ${ele.release_year}`)
                })
                filterOption(result)
            })
        }
        else if (input === '2') {
            cmd.question('please enter title to search for \n', async (input) => {
                const result = await searchMovies(MovieInfoType.TITLE, input)
                if (result.length === 0) {
                    console.log('No Movies Found')
                    backToMainMenu()
                }
                else {
                    console.log(`Total of ${result.length} movies is found :`)
                    result.map(ele => {
                        console.log(`Title: ${ele.title} , Director: ${ele.director}, Release Year: ${ele.release_year}`)
                    })
                    filterOption(result)
                }
            })
        }
        else if (input === '3') {
            cmd.question('please enter director name to search for \n', async (input) => {
                const result = await searchMovies(MovieInfoType.DIRECTOR, input)
                if (result.length === 0) {
                    console.log('No Movies Found')
                    backToMainMenu()
                }
                else {
                    console.log(`Total of ${result.length} movies is found :`)
                    result.map(ele => {
                        console.log(`Title: ${ele.title} , Director: ${ele.director}, Release Year: ${ele.release_year}`)
                    })
                    filterOption(result)
                }
            })
        }
        else if (input === '4') {
            cmd.question('please enter release year to search for \n', async (input) => {
                const result = await searchMovies(MovieInfoType.RELEASE_YEAR, input)
                if (result.length === 0) {
                    console.log('No Movies Found')
                    backToMainMenu()
                } else {
                    console.log(`Total of ${result.length} movies is found :`)
                    result.map(ele => {
                        console.log(`Title: ${ele.title} , Director: ${ele.director}, Release Year: ${ele.release_year}`)
                    })
                    filterOption(result)
                }
            })
        }
        else if (input === '5') {
            cmd.question('please enter genre to search for \n', async (input) => {
                const result = await searchMovies(MovieInfoType.GENRE, input)
                if (result.length === 0) {
                    console.log('No Movies Found')
                    backToMainMenu()
                } else {
                    console.log(`Total of ${result.length} movies is found :`)
                    result.map(ele => {
                        console.log(`Title: ${ele.title} , Director: ${ele.director}, Release Year: ${ele.release_year}`)
                    })
                    filterOption(result)
                }
            })
        }
        else if (input === '6') {
            main()
        }

    })
}



main()


