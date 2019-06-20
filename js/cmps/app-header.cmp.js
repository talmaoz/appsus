export default {
    name: 'TheAppHeader',
    template: `
        <div class="header-container">
            <div class="flex-column-container">
                <h1>TalSus</h1>
            </div>
            <div class="flex-column-container">
                <button class="apps-menu-btn">
                </button>
                <nav 
                    v-if="appListOpen">
                    <router-link exact to="/">Home</router-link>
                    <router-link to="/about" >About</router-link>
                    <router-link to="/book"  >Books</router-link>
                </nav>
            </div>     
        </div>    
    `,
    data() {
        return {
            appListOpen : false,
        }
    },
    created() {
        // created()
    },
    methods: {
        // methods funcs
    }
}