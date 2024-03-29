import notesService from '../../services/notes.service.js'
import eventBus from '../../event-bus.js'
import {NOTE_DELETED} from '../../event-bus.js'
import noteColorPallete from './note-color-pallete.cmp.js';
import {COLOR_BLUE   } from './note-color-pallete.cmp.js'
import {COLOR_PURPLE } from './note-color-pallete.cmp.js'
import {COLOR_GREEN  } from './note-color-pallete.cmp.js'
import {COLOR_GREY   } from './note-color-pallete.cmp.js'
import {COLOR_YELLOW } from './note-color-pallete.cmp.js'
import {COLOR_BROWN  } from './note-color-pallete.cmp.js'

const CLOSE_PALLETE_DELAY = 5000


export default {
    props: ['note'],
    template: `
        <section class="note-details" :class="noteColor">
            <div class="buttons-container">
                <div class="flex-column-container">
                    <button 
                        class="back-to-list-btn"
                        title="Back To Notes List"
                        @click="emitBackToList">
                        Back To Notes List
                    </button>
                </div>
                <div class="flex-column-container">
                    <div class="controllers-container">
                        <button 
                            :class="isPinnedClass"
                            @click="pinNote"
                            :title="pinOrUnpin"
                            ref="pin-note-btn">
                        </button>
                        <button 
                            class="color-pallete-btn"
                            @click="toggleColorPallete"
                            title="Change Color">
                        </button>
                        <note-color-pallete
                            @color-changed="colorChanged"
                            v-bind:note="note"
                            v-if="isColorPalleteOpen"
                            class="color-pallete-container">    
                        </note-color-pallete>
                        <button 
                            class="delete-btn"
                            @click="deleteNote"
                            title="Delete Note" >
                        </button>
                    </div>
                </div> 
            </div>
            
            <textarea 
                v-model="note.title"
                @click="closeColorPallete"
                v-bind:placeholder="titlePlaceholder"
                rows="1" cols="100" class="textarea-h3">
            </textarea>
            
            <img 
                v-if="note.thumbnail"
                v-bind:title="note.title"
                v-bind:src="note.thumbnail"
                @click="closeColorPallete"
            >
            
            <textarea
                v-if="isTxtShown"
                v-model="note.txt"
                v-bind:placeholder="txtPlaceholder"
                rows="1" cols="100"  
                class="textarea-h4"
                @click="closeColorPallete">
            </textarea>
            
            <div 
                v-if="note.checkList"
                class="textarea-h4"> 
                <input
                    v-for="(checkItem, checkIdx) in note.checkList"
                    v-bind:key="checkIdx"
                    v-model="note.checkList[checkIdx]"
                />
            </div>
        </section>
    `,
    data() {
        return {
            isColorPalleteOpen : false,
        }
    },
    computed: {
        titlePlaceholder() {
            return (this.note.title) ? '' : 'Title'
        },
        txtPlaceholder() {
            return (this.note.txt) ? '' : 'Txt'
        },
        isTxtShown() {
            // If this.note.txt is null -> return false (note is not of type txt)
            // If this.note.txt is '' or some other string, return true
            return typeof (this.note.txt) === 'string'
        },
        isPinnedClass() {
            return {
                'pin-note-btn-pinned'  : this.note.isPinned,
                'pin-note-btn-unpinned': !this.note.isPinned,
            }
        },
        pinOrUnpin() {
            return (this.note.isPinned)? "Note pinned, click to unpin." : "Note unpinned, click to pin."
        },
        noteColor() {
            return {
                'note-color-blue  ' : this.note.color === COLOR_BLUE  ,
                'note-color-purple' : this.note.color === COLOR_PURPLE,
                'note-color-green ' : this.note.color === COLOR_GREEN ,
                'note-color-grey  ' : this.note.color === COLOR_GREY  ,
                'note-color-yellow' : this.note.color === COLOR_YELLOW,
                'note-color-brown ' : this.note.color === COLOR_BROWN ,
            }
        },
    },
    methods: {
        emitBackToList () {
            this.$emit('back-to-list', '')
        },
        deleteNote() {
            // TODO - add support to "Are you sure you want to delete this nore?"
            eventBus.$emit(NOTE_DELETED, this.note.id);
            this.emitBackToList()
        },
        pinNote() {
            this.note.isPinned = !this.note.isPinned
        },
        toggleColorPallete() {
            this.isColorPalleteOpen = !this.isColorPalleteOpen
        },
        closeColorPallete() {
            this.isColorPalleteOpen = false;
        },
        colorChanged(color){
            this.note.color = color
            notesService.updateNote(this.note)
            this.toggleColorPallete()
        },
    },
    watch: {
        note: {
            deep: true,
            handler() {
                notesService.updateNote(this.note)
            }
        }
    },
    components: {
        noteColorPallete,
    },
}
