import notesService from '../../services/notes.service.js'

export default {
    template: `
        <section class="notes-new">
            <div class="flex-column-container">
                <p>New note: </p>
            </div>
            <button 
                title="New plain text note."
                v-on:click="emitNewNote('txt-note')"
                class="new-txt-note-btn">
            </button>
            <button
                title="New check-list note." 
                v-on:click="emitNewNote('checklist-note')"
                class="new-checklist-note-btn">
            </button>
            <button 
                title="New image note."
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
