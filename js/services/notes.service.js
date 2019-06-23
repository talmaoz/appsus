import {storageService} from './storage.service.js'
import {utilService} from './util.service.js'
import {COLOR_BLUE  } from '../cmps/notes/note-color-pallete.cmp.js'
import {COLOR_PURPLE} from '../cmps/notes/note-color-pallete.cmp.js'
import {COLOR_GREEN } from '../cmps/notes/note-color-pallete.cmp.js'
import {COLOR_GREY  } from '../cmps/notes/note-color-pallete.cmp.js'
import {COLOR_YELLOW} from '../cmps/notes/note-color-pallete.cmp.js'
import {COLOR_BROWN } from '../cmps/notes/note-color-pallete.cmp.js'

export default {
    query,
    updateNote,
    deleteNote,
    getEmptyNote,
    addNewNote,
}

// Simulation controllers:
const SIMULATED_SERVER_DELAY         = 0.001 * 1000
const SIMULATE_SERVER_ERR            = false
const SIMULATE_LOCAL_STORAGE_DELETED = false
// Random data controllers:
const PROB_OF_TITLE  = 50
const PROB_OF_TXT    = 45
const PROB_OF_LIST   = 45
const PROB_OF_PINNED = 60
const NOTES_COUNT    = 20

const NOTES_KEY = 'notes'
const DEFAULT_COLOR = COLOR_PURPLE
let gNotes

function query() {
    gNotes = storageService.load(NOTES_KEY);
    if (SIMULATE_LOCAL_STORAGE_DELETED) gNotes = null
    if (!gNotes) {
        gNotes = generateNotes();
        storageService.store(NOTES_KEY, gNotes)
    }
    if (SIMULATE_SERVER_ERR) gNotes = null
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if (!gNotes) {
                reject(`Couldn't retrieve data from server.`)
            } else {
                let notes = JSON.parse(JSON.stringify(gNotes))// Deep copy of gNotes into other array notes
                resolve(notes)
            }
        }, SIMULATED_SERVER_DELAY)
    })
}

function generateNotes() {
    let notes = []
    for (let i = 0; i < NOTES_COUNT; i++) {
        notes.push(createRandomNote())
    }
    return notes;
}

function updateNote(noteToUpdate) {
    // TODO - make update server-simulated
    let changedNoteIdx = gNotes.findIndex((note) => note.id === noteToUpdate.id)
    gNotes[changedNoteIdx] = noteToUpdate
    storageService.store(NOTES_KEY, gNotes)
}

function deleteNote(noteId) {
    // TODO - make delete server-simulated
    const deleteIdx = gNotes.findIndex((note) => note.id === noteId)
    if (deleteIdx !== -1) {
        gNotes.splice(deleteIdx,1)
        return true
    } else return false;
}

function getEmptyNote(noteType) {

    let txt = null
    if (noteType === 'txt-note') txt = ''

    let checkList = null
    if (noteType === 'checklist-note') checkList = []

    let thumbnail = null
    if (noteType === 'img-note') thumbnail = ''

    return {
        // TODO - add validation that randomly created ID does not already exist in gNotes
        id        : utilService.makeId(),
        title     : null                ,
        txt       : txt                 ,
        checkList : checkList           ,
        thumbnail : thumbnail           ,
        isPinned  : false               ,
        color     : DEFAULT_COLOR       ,
    }
}

function addNewNote(newNote) {
    gNotes.unshift(newNote)
    storageService.store(NOTES_KEY, gNotes)
}

function createRandomNote() {
    const COLORS = [
        COLOR_BLUE  ,
        COLOR_PURPLE,
        COLOR_GREEN ,
        COLOR_GREY  ,
        COLOR_YELLOW,
        COLOR_BROWN ,
    ]
    let getRandomInt = utilService.getRandomInt
    let makeLorem = utilService.makeLorem
    let getRandomBool = utilService.getRandomBool

    let id = utilService.makeId()

    // PROB_OF_TITLE % chance for a note title
    let title = null
    if (getRandomBool(PROB_OF_TITLE)) {
        title = makeLorem(getRandomInt(5, 40))
    }

    // PROB_OF_TXT % chance for a plain txt note
    let txt = null
    if (getRandomBool(PROB_OF_TXT)) {
        txt = makeLorem(getRandomInt(10, 300))
    }

    // PROB_OF_LIST % chance for a list note
    let checkList = null
    if (!txt && getRandomBool(PROB_OF_LIST)) {
        checkList = []
        for (let i=0; i<getRandomInt(1,30); i++) {
            checkList.push(makeLorem(getRandomInt(5, 40)))
        }
    }

    // If note is not a txt nor a list, it'll be an img.
    // It's approximately `100 - (PROB_OF_LIST + PROB_OF_TXT)` chance.
    let thumbnail = null
    if ((!txt && !checkList)  ) {
        let imgBaseUrl = 'http://coding-academy.org/books-photos/'
        thumbnail = imgBaseUrl + getRandomInt(1, 21) + '.jpg'
    }

    let isPinned = false
    if (getRandomBool(PROB_OF_PINNED)) isPinned = true;

    let color = COLORS[getRandomInt(0, COLORS.length-1 )]

    return {
        id,
        title,
        txt,
        checkList,
        thumbnail,
        isPinned,
        color,
    }
}

