import {COLOR_BLUE   } from './note-color-pallete.cmp.js'
import {COLOR_PURPLE } from './note-color-pallete.cmp.js'
import {COLOR_GREEN  } from './note-color-pallete.cmp.js'
import {COLOR_GREY   } from './note-color-pallete.cmp.js'
import {COLOR_YELLOW } from './note-color-pallete.cmp.js'
import {COLOR_BROWN  } from './note-color-pallete.cmp.js'

export default {
    props: ['note'],
    template: `
        <li 
            :class="noteColor"
            v-on:click="emitSelectedNote">
            <h3  v-if="note.title">{{note.title}}</h3>
            <img v-if="note.thumbnail" v-bind:title="note.title" v-bind:src="note.thumbnail">
            <h4  v-if="note.txt">{{note.txt}}</h4>
            <ul v-if="note.checkList"> 
                <li
                    v-bind:key="checkItem"
                    v-for="checkItem in note.checkList">
                    - {{checkItem}}
                </li>
            </ul>
        </li>
    `,
    methods: {
        emitSelectedNote() {
            // TODO - move emit logic to bus logic, since currently it emits from note-preview, to note-list, then from note-list to note-app... I want it to emit directly to the app
            this.$emit('note-clicked', this.note)
        },
    },
    computed: {
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

}

