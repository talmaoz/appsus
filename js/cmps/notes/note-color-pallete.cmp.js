import notesService from "../../services/notes.service.js";

export const COLOR_CHANGED ='color-changed'
export const COLOR_BLUE   = 'blue'
export const COLOR_PURPLE = 'purple'
export const COLOR_GREEN  = 'green'
export const COLOR_GREY   = 'grey'
export const COLOR_YELLOW = 'yellow'
export const COLOR_BROWN  = 'brown'

export default {
    props: ['note'],
    template: `
        <section>
               <button
                    v-for="color in COLORS"
                    :class="buttonColor(color)"
                    v-on:click="updateNoteColor(color)"
                    v-bind:key="color">
               </button>
        </section>
    `,
    methods: {
        updateNoteColor(color) {
            this.note.color = color
            notesService.updateNote(this.note)
            // this.$emit(COLOR_CHANGED, '')
            this.$emit('bla', '')
        },
        buttonColor(color) {
            return {
                'note-color-blue  ' : color === COLOR_BLUE  ,
                'note-color-purple' : color === COLOR_PURPLE,
                'note-color-green ' : color === COLOR_GREEN ,
                'note-color-grey  ' : color === COLOR_GREY  ,
                'note-color-yellow' : color === COLOR_YELLOW,
                'note-color-brown ' : color === COLOR_BROWN ,
            }
        },
    },
    data() {
        return {
            COLORS : [
                COLOR_BLUE  ,
                COLOR_PURPLE,
                COLOR_GREEN ,
                COLOR_GREY  ,
                COLOR_YELLOW,
                COLOR_BROWN ,
            ],
        }
    },
}
