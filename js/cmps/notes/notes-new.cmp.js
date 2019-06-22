export default {
    template: `
        <section class="notes-filter">
            <input 
                placeholder="Search for a note..."
                type="text"
                v-model="filterBy.txt"
                @input="emitFilter" 
            />
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: ''
            }
        }
    },
    methods: {
        emitFilter() {
            this.$emit('set-filter', this.filterBy);
        }
    }
}
