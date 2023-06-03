import fs from "fs";

export const readFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('movies.json', 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                const movies = JSON.parse(data)
                return resolve(movies)
            }
        })
    })

}

export const writeOnFile = (jsonContent) => {
    fs.writeFileSync('movies.json', jsonContent);
}

export const getJsonFilesInFolder = () => {
    const files = fs.readdirSync(process.cwd())
    const jsonFiles = files.filter(file => file.endsWith('.json'))
    return jsonFiles
}

