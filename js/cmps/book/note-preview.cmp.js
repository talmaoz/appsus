export default {
    props: ['note'],
    template: `
        <li v-on:click="emitSelectedNote">
            <h3>{{note.title}}</h3>
            <h4>{{}} Note content will appear here</h4>
            <img v-bind:title="note.title" v-bind:src="note.thumbnail">
        </li>
    `,
    methods: {
        emitSelectedNote() {
            // TODO - move emit logic to bus logic, since currently it emits from note-preview, to note-list, then from note-list to note-app... I want it to emit directly to the app
            this.$emit('note-clicked', this.note)
        },
    },
}

