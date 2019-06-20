import {storageService} from './storage.service.js'
import {utilService} from './util.service.js'

export default {
    query
}

const NOTES_KEY = 'notes'

// Simulation controllers:
const SIMULATED_SERVER_DELAY = 0.001 * 1000
const SIMULATE_SERVER_ERR    = false

function query() {
    let notes = storageService.load(NOTES_KEY);
    if (!notes) {
        notes = generateNotes();
        storageService.store(NOTES_KEY, notes)
    }
    if (SIMULATE_SERVER_ERR) notes = null
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if (!notes) {
                reject(`Couldn't retrieve data from server.`)
            } else {
                resolve(notes)
            }
        }, SIMULATED_SERVER_DELAY)
    })
}

function generateNotes() {
    var notes = []
    for (let index = 0; index < 20; index++) {
        let note = createNote()
        notes.push(note)

    }
    return notes;
}

function createNote() {
    let imgBaseUrl = 'http://coding-academy.org/books-photos/'
    // let thumbnail = ''
    // if (utilService.getRandomInt(0, 100) > 80) {
    //     thumbnail = imgBaseUrl + utilService.getRandomInt(1, 21) + '.jpg'
    // }

    return {
        id: utilService.makeId(),
        title: utilService.makeLorem(10),
        publishedDate: utilService.getRandomInt(1900, 2000),
        // thumbnail: thumbnail,
        thumbnail: imgBaseUrl + utilService.getRandomInt(1, 21) + '.jpg',
        price: utilService.getRandomInt(50, 400),
        pages: utilService.getRandomInt(50, 900),
        isOnSale: utilService.getRandomInt(0, 100) > 70,
    }
}

