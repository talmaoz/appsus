export default {
    props: ['book'],
    template: `
        <li v-on:click="emitSelectedBook">
            <h3>{{book.title}}</h3>
            <h4>{{book.price}}$</h4>
            <img v-bind:title="book.title" v-bind:src="book.thumbnail" />
        </li>
    `,
    methods: {
        emitSelectedBook() {
            this.$emit('book-clicked', this.book)
        },
    },
}

