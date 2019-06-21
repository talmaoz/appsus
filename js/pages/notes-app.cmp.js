import notesService from '../services/notes.service.js'
import notesList    from '../cmps/notes/notes-list.cmp.js'
import notesFilter  from '../cmps/notes/notes-filter.cmp.js'
import noteDetails from '../cmps/notes/note-details.cmp.js'

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
                
                <notes-filter 
                        v-if="!selectedNote"
                        @set-filter="setFilter">    
                </notes-filter>
                    
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
    },
    components: {
        notesList,
        notesFilter,
        noteDetails,
    },
    created() {
        let notesPrm = notesService.query()
        notesPrm
            .then((notesFromDb) => {
                this.notes = notesFromDb
            })
            .catch((serverErr) => {
                this.notesErr.isErr  = true
                this.notesErr.errMsg = serverErr
            })
    },
}
