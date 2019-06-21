import notesService from '../../services/notes.service.js'

export default {
    props: ['note'],
    template: `
        <div class="note-details">
            <button @click="emitBackToList">Back To Notes List</button>
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
        </div>
    `,
    computed: {
        titlePlaceholder() {
            return (this.editedNote.title)? '' : 'Title...'
        },
        txtPlaceholder() {
            return (this.editedNote.txt)? '' : 'Txt...'
        },
        isTxtShown() {
            return typeof(this.editedNote.txt)==='string'
        },
    },
    methods: {
        emitBackToList () {
            notesService.updateNote(this.editedNote)
            this.$emit('back-to-list', '')
        },
    },
    data () {
        return {
            editedNote : this.note,
        }
    },
    destroyed() {
        notesService.updateNote(this.editedNote)
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


