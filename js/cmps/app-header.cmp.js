export default {
    name: 'TheAppHeader',
    template: `
            <div class="header-container">
                <header class="app-header">
                    <h1 class="flex-column-container">Miss Book</h1>
                    <nav>
                        <router-link class="flex-column-container" exact to="/">Home</router-link>
                        <router-link class="flex-column-container" to="/about" >About</router-link>
                        <router-link class="flex-column-container" to="/book"  >Books</router-link>
                    </nav>
                                                                   
                </header>
            </div>    
    `,
    data() {
        return {
            // data key value pairs
        }
    },
    created() {
        // created()
    },
    methods: {
        // methods funcs
    }
}