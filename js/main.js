'use strict';

import bookApp from './pages/book-app.cmp.js';
import appHeader from './cmps/app-header.cmp.js'
import theRoutes from './routes.js'
const myRouter = new VueRouter({ routes: theRoutes })

var app = new Vue({
    el: '#app',
    template: `
        <section class="appsus">
            <header class="appsus-header">
                <app-header></app-header>
            </header>
            <section class="appsus-selected-app">
                <router-view ></router-view>
            </section>
            <footer class="appsus-footer">
                <!-- TODO - Replace "Coffee-rights 2019" with app-footer cmp -->
                Coffee-rights 2019
            </footer>
        </section>
    `,
    components: {
        bookApp,
        appHeader,
    },
    router: myRouter
})
