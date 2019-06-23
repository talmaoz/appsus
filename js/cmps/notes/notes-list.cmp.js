import notePreview from './note-preview.cmp.js';

export default {
    props: ['notes'],
    template: `
    <section>
            <ul class="notes-list">
                <note-preview
                    @note-clicked="emitNoteClickedToApp"
                    v-for="currentNote in notes"
                    v-bind:key="currentNote.id"
                    v-bind:note="currentNote">
                </note-preview>
            </ul>
        </section>
    `,
    methods: {
        emitNoteClickedToApp (clickedNote) {
            this.$emit('note-selected', clickedNote)
        },
    },
    components: {
        notePreview,
    },
}

