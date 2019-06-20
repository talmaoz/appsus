import bookPreview from './book-preview.cmp.js';

export default {
    props: ['books'],
    template: `
    <section>
            <ul class="book-list">
                <book-preview
                    @note-clicked="emitNoteClickedToApp"
                    v-for="currentNote in books"
                    v-bind:key="currentNote.id"
                    v-bind:note="currentNote">
                </book-preview>
            </ul>
        </section>
    `,
    methods: {
        emitNoteClickedToApp (clickedNote) {
            this.$emit('book-selected', clickedNote)
        },
    },
    components: {
        bookPreview,
    },
}