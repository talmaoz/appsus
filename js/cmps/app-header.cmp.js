export default {
    name: 'TheAppHeader',
    template: `
        <div class="header-container">
            <div class="flex-column-container">
                <h1>TalSus</h1>
            </div>
            <div class="flex-column-container">
                <router-link
                    class="apps-menu-btn"
                    exact to="/">
                </router-link>
            </div>     
        </div>    
    `,
}