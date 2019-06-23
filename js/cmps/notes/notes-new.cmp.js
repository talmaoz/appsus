import notesService from '../../services/notes.service.js'

export default {
    template: `
        <section class="notes-new">
            <button 
                v-on:click="emitNewNote('txt-note')"
                class="new-txt-note-btn">
            </button>
            <button 
                v-on:click="emitNewNote('checklist-note')"
                class="new-checklist-note-btn">
            </button>
            <button 
                v-on:click="emitNewNote('img-note')"
                class="new-img-note-btn">
                    IMG
            </button>
        </section>
    `,
    methods: {
        emitNewNote(noteType) {
            let emptyNewNote = notesService.getEmptyNote(noteType)
            this.$emit('new-note', emptyNewNote);
        }
    }
}
