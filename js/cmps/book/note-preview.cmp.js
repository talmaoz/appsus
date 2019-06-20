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
            this.$emit('note-clicked', this.note)
        },
    },
}

