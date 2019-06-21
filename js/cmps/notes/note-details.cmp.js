export default {
    props: ['note'],
    template: `
        <div class="note-details">
            <button @click="emitBackToList">Back To Notes List</button>
            <input
                class="inputH3" 
                v-model="editedNote.title"
                v-bind:placeholder="titlePlaceholder"
            />
           
            <img 
                v-if="editedNote.thumbnail"
                v-bind:title="editedNote.title"
                v-bind:src="editedNote.thumbnail"
            >
            
            <input
                v-if="isTxtShown" 
                class="inputH4"
                v-model="editedNote.txt"
                v-bind:placeholder="txtPlaceholder"
            />
            
            <ul v-if="editedNote.checkList"> 
                <li
                    v-bind:key="checkItem"
                    v-for="(checkItem, checkIdx) in note.checkList">
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
            this.$emit('back-to-list', '')
        },
    },
    data () {
        return {
            editedNote : this.note,
        }
    },
    destroyed() {
      // TODO - add update of editedNote to DB (currently local storage)
    },
}


