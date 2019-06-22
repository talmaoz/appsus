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
                        <button 
                            :class="isPinnedClass"
                            @click="pinNote"
                            :title="pinOrUnpin"
                            ref="pin-note-btn">
                        </button>
                        <button 
                            class="color-pallete-btn"
                            @click="changeColor"
                            title="Change Color">
                        </button>
                        <button 
                            class="delete-btn"
                            @click="deleteNote"
                            title="Delete Note" >
                        </button>
                    </div>
                </div> 
            </div>
            
            <textarea 
                v-model="note.title"
                v-bind:placeholder="titlePlaceholder"
                rows="1" cols="100" class="textarea-h3">
            </textarea>
            
            <img 
                v-if="note.thumbnail"
                v-bind:title="note.title"
                v-bind:src="note.thumbnail"
            >
            
            <textarea
                v-if="isTxtShown"
                v-model="note.txt"
                v-bind:placeholder="txtPlaceholder"
                rows="1" cols="100"  
                class="textarea-h4">
            </textarea>
            
            <ul v-if="note.checkList"> 
                <li
                    v-bind:key="checkItem"
                    v-for="(checkItem, checkIdx) in note.checkList">
                    - {{checkItem}}
                </li>
            </ul>
        </section>
    `,
    computed: {
        titlePlaceholder() {
            return (this.note.title) ? '' : 'Title'
        },
        txtPlaceholder() {
            return (this.note.txt) ? '' : 'Txt'
        },
        isTxtShown() {
            // If this.note.txt is null -> return false (note is not of type txt)
            // If this.note.txt is '' or some other string, return true
            return typeof (this.note.txt) === 'string'
        },
        isPinnedClass() {
            return {
                'pin-note-btn-pinned'  : this.note.isPinned,
                'pin-note-btn-unpinned': !this.note.isPinned,
            }
        },
        pinOrUnpin() {
            return (this.note.isPinned)? "Note pinned, click to unpin." : "Note unpinned, click to pin."
        },
    },
    methods: {
        emitBackToList () {
            this.$emit('back-to-list', '')
        },
        deleteNote() {
            // TODO - add support to "Are you sure you want to delete this nore?"
            notesService.deleteNote(this.note.id)
            eventBus.$emit(NOTE_DELETED, this.note.id);
            this.emitBackToList()
        },
        pinNote() {
            this.note.isPinned = !this.note.isPinned
        },
        changeColor() {
            
        },
    },
    watch: {
        note: {
            deep: true,
            handler() {
                notesService.updateNote(this.note)
            }
        }
    },
}
