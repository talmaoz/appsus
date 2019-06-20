import bookPreview from './book-preview.cmp.js';

export default {
    props: ['books'],
    template: `
    <section>
            <ul class="book-list">
                <book-preview
                    @book-clicked="emitBookClickedToApp"
                    v-for="currentBook in books"
                    v-bind:key="currentBook.id"
                    v-bind:book="currentBook">
                </book-preview>
            </ul>
        </section>
    `,
    methods: {
        emitBookClickedToApp (clickedBook) {
            this.$emit('book-selected', clickedBook)
        },
    },
    components: {
        bookPreview,
    },
}