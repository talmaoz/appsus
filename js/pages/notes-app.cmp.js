import notesService from '../services/notes.service.js'
import notesFilter  from '../cmps/notes/notes-filter.cmp.js'
import notesNew from '../cmps/notes/notes-new.cmp.js'
import notesList    from '../cmps/notes/notes-list.cmp.js'
import noteDetails from '../cmps/notes/note-details.cmp.js'
import eventBus from '../event-bus.js'
import {NOTE_DELETED} from '../event-bus.js'

export default {
    template: `
        <section class="notes-app">
            <h2 
                class="notes-app-inner-container"
                v-if="notesErr.isErr"
                >{{notesErr.errMsg}}
            </h2>
            
            <div
                class="notes-app-inner-container"
                v-if="!notesErr.isErr">
                
                <section 
                    v-if="!selectedNote"
                    class="controllers-container">
                    <notes-filter 
                        @set-filter="setFilter">    
                    </notes-filter>
                    <notes-new
                        @new-note="newNoteAdded">
                    </notes-new>
                </section>
                
                <notes-list 
                    v-if="!selectedNote"
                    :notes="notesForDisplay"
                    @note-selected="setSelectedNote">
                </notes-list>
                    
                <note-details
                    v-if="selectedNote"
                    :note="selectedNote"
                    @back-to-list="backToList">
                </note-details>
            </div>
        </section>
    `,
    data() {
        return {
            filter: null,
            notes: [],
            selectedNote: null,
            notesErr: {isErr: false, errMsg: ''},
        }
    },
    computed: {
        notesForDisplay() {
            if (!this.filter) return this.notes;
            return this.notes.filter(note => {
                if (note.title && note.title.includes(this.filter.txt)) return true;
                if (note.txt   && note.txt  .includes(this.filter.txt)) return true;
            })
        },
    },
    methods: {
        setFilter(filter) {
            this.filter = filter
        },
        setSelectedNote(selectedNote) {
            this.selectedNote = selectedNote
        },
        backToList() {
            this.selectedNote = null
        },
        newNoteAdded(newNote) {
            this.notes.unshift(newNote)
            notesService.addNewNote(newNote)
            this.selectedNote = newNote
            console.log('this.selectedNote = ', this.selectedNote)
        },
    },
    components: {
        notesFilter,
        notesNew,
        notesList,
        noteDetails,
    },
    created() {
        // Get notes from simulated server:
        let notesPrm = notesService.query()
        notesPrm
            .then((notesFromDb) => {
                this.notes = notesFromDb
            })
            .catch((serverErr) => {
                this.notesErr.isErr  = true
                this.notesErr.errMsg = serverErr
            })
        // Listener for note deleted:
        eventBus.$on(NOTE_DELETED, (noteToDeletedId) => {
            const deleteIdx = this.notes.findIndex(note => note.id === noteToDeletedId)
            if (deleteIdx !== -1) {
                this.notes.splice(deleteIdx,1)
                notesService.deleteNote(noteToDeletedId)
            } else {
                // TODO - add support to if delete failed, then do something
            }
        })
    },
}