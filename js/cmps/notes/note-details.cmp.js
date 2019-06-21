export default {
    props: ['note'],
    template: `
        <div class="note-details">
            <button @click="emitBackToList">Back To Notes List</button>
            <h3>
                <input 
                    v-model="editedNote.title"
                    v-bind:placeholder="titlePlaceholder"
                />
            </h3>
            <img v-if="note.thumbnail" v-bind:title="note.title" v-bind:src="note.thumbnail">
            <h4  v-if="note.txt">{{note.txt}}</h4>
            <ul v-if="note.checkList"> 
                <li
                    v-bind:key="checkItem"
                    v-for="checkItem in note.checkList">
                    - {{checkItem}}
                </li>
            </ul>
        </div>
    `,
    computed: {
        titlePlaceholder() {
            return (this.note.title)? '' : 'Title...'
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
}


