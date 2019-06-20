'use strict';

import bookApp from './pages/book-app.cmp.js';
import appHeader from './cmps/app-header.cmp.js'
import theRoutes from './routes.js'
const myRouter = new VueRouter({ routes: theRoutes })

var app = new Vue({
    el: '#app',
    template: `
        <section class="appsus">
            <app-header class="appsus-header"></app-header>
            <router-view class="app-container"></router-view>
            <footer class="appsus-footer">coffeerights 2019</footer>
        </section>
    `,
    components: {
        bookApp,
        appHeader,
    },
    router: myRouter
})
