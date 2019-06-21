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
                v-if="note.thumbnail"
                v-bind:title="editedNote.title"
                v-bind:src="editedNote.thumbnail"
            >
            
            <input
                class="inputH4"
                v-if="note.txt" 
                v-model="editedNote.txt"
                v-bind:placeholder="txtPlaceholder"
            />
            
            <ul v-if="note.checkList"> 
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
            return (this.note.title)? '' : 'Title...'
        },
        txtPlaceholder() {
            return (this.note.txt)? '' : 'Txt...'
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


