export default {
    props: ['note'],
    template: `
        <div class="note-details">
            <button @click="emitBackToList">Back To List</button>
            <h3>{{note.title}}</h3>
            <h4>{{}} Note content will appear here</h4>
            <img v-bind:title="note.title" v-bind:src="note.thumbnail" />
        </div>
    `,
    computed: {
        someFunc() {
            // return computed value
        },
    },
    methods: {
        emitBackToList () {
            this.$emit('back-to-list', '')
        },
    },
}


