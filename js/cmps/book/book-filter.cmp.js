export default {
    template: `
        <section class="book-filter">
            <label>Search by Name:</label>
            <input 
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
