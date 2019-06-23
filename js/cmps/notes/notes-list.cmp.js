import notePreview from './note-preview.cmp.js';
import {COLOR_BLUE   } from './note-color-pallete.cmp.js'
import {COLOR_PURPLE } from './note-color-pallete.cmp.js'
import {COLOR_GREEN  } from './note-color-pallete.cmp.js'
import {COLOR_GREY   } from './note-color-pallete.cmp.js'
import {COLOR_YELLOW } from './note-color-pallete.cmp.js'
import {COLOR_BROWN  } from './note-color-pallete.cmp.js'


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

