export default {
    props: ['note'],
    template: `
        <li v-on:click="emitSelectedNote">
            <h3  v-if="note.title">{{note.title}}</h3>
            <img v-if="note.thumbnail" v-bind:title="note.title" v-bind:src="note.thumbnail">
            <h4  v-if="note.txt">{{note.txt}}</h4>
            <ul v-if="note.checkList"> 
                <li
                    v-bind:key="checkItem"
                    v-for="checkItem in note.checkList">
                    - {{checkItem}}
                </li>
            </ul>
        </li>
    `,
    methods: {
        emitSelectedNote() {
            // TODO - move emit logic to bus logic, since currently it emits from note-preview, to note-list, then from note-list to note-app... I want it to emit directly to the app
            this.$emit('note-clicked', this.note)
        },
    },
}

