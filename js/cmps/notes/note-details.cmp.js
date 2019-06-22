import notesService from '../../services/notes.service.js'
import eventBus from '../../event-bus.js'
import {NOTE_DELETED} from '../../event-bus.js'

export default {
    props: ['note'],
    template: `
        <section class="note-details">
            <div class="buttons-container">
                <div class="flex-column-container">
                    <button 
                        class="back-to-list-btn"
                        title="Back To Notes List"
                        @click="emitBackToList">
                        Back To Notes List
                    </button>
                </div>
                <div class="flex-column-container">
                        <div class="controllers-container">
                        <button class="pin-note-btn"      @click="pinNote"     title="Pin Note"    ></button>
                        <button class="color-pallete-btn" @click="changeColor" title="Change Color"></button>
                        <button class="delete-btn"        @click="deleteNote"  title="Delete Note" ></button>
                    </div>
                </div> 
            </div>
            
            <textarea 
                v-model="editedNote.title"
                v-bind:placeholder="titlePlaceholder"
                rows="1" cols="100" class="textarea-h3">
            </textarea>
            
            <img 
                v-if="editedNote.thumbnail"
                v-bind:title="editedNote.title"
                v-bind:src="editedNote.thumbnail"
            >
            
            <textarea
                v-if="isTxtShown"
                v-model="editedNote.txt"
                v-bind:placeholder="txtPlaceholder"
                rows="1" cols="100"  
                class="textarea-h4">
            </textarea>
            
            <ul v-if="editedNote.checkList"> 
                <li
                    v-bind:key="checkItem"
                    v-for="(checkItem, checkIdx) in editedNote.checkList">
                    - {{checkItem}}
                </li>
            </ul>
        </section>
    `,
    computed: {
        titlePlaceholder() {
            return (this.editedNote.title)? '' : 'Title'
        },
        txtPlaceholder() {
            return (this.editedNote.txt)? '' : 'Txt'
        },
        isTxtShown() {
            // If this.editedNote.txt is null -> return false
            // If this.editedNote.txt is '' or some other string, return true
            return typeof(this.editedNote.txt)==='string'
        },
    },
    methods: {
        emitBackToList () {
            this.$emit('back-to-list', '')
        },
        deleteNote() {
            // TODO - add support to "Are you sure you want to delete this nore?"
            notesService.deleteNote(this.editedNote.id)
            eventBus.$emit(NOTE_DELETED, this.editedNote.id);
            this.emitBackToList()
        },
        pinNote() {
            
        },
        changeColor() {
            
        },
    },
    data () {
        return {
            editedNote : this.note,
        }
    },
    watch: {
        editedNote: {
            deep: true,
            handler() {
                notesService.updateNote(this.editedNote)
            }
        }
    }
}


