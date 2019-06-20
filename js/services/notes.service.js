import {storageService} from './storage.service.js'
import {utilService} from './util.service.js'

export default {
    query
}

const NOTES_KEY = 'notes'

// Simulation controllers:
const SIMULATED_SERVER_DELAY         = 0.001 * 1000
const SIMULATE_SERVER_ERR            = false
const SIMULATE_LOCAL_STORAGE_DELETED = true

function query() {
    let notes = storageService.load(NOTES_KEY);
    if (SIMULATE_LOCAL_STORAGE_DELETED) notes = null
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
        let note = createRandomNote()
        notes.push(note)

    }
    return notes;
}

function createRandomNote() {

    let getRandomInt = utilService.getRandomInt
    let makeLorem = utilService.makeLorem

    // 50% chance for a note title
    let title = null
    if (getRandomInt(0, 100) < 50) {
        title = makeLorem(getRandomInt(5, 40))
    }

    // 40% chance for a plain txt note
    let txt = null
    if (getRandomInt(0, 100) < 40) {
        txt = makeLorem(getRandomInt(10, 500))
    }

    // 40% chance for a list note
    let checkList = null
    if (!txt && getRandomInt(0, 100) < 40) {
        checkList = []
        for (let i=0; i<getRandomInt(1,30); i++) {
            checkList.push(makeLorem(getRandomInt(5, 40)))
        }
    }

    // 20% chance for an image note
    let thumbnail = null
    if (!txt && !checkList) {
        let imgBaseUrl = 'http://coding-academy.org/books-photos/'
        thumbnail = imgBaseUrl + getRandomInt(1, 21) + '.jpg'
    }

    return {
        id       : utilService.makeId(),
        title    : title,
        txt      : txt,
        checkList: checkList,
        thumbnail: thumbnail,
    }
}
