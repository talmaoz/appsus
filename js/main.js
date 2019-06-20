'use strict';

import bookApp from './pages/book-app.cmp.js';
import appHeader from './cmps/app-header.cmp.js'
import theRoutes from './routes.js'
const myRouter = new VueRouter({ routes: theRoutes })

var app = new Vue({
    el: '#app',
    template: `
        <div>
            <app-header></app-header>
            <router-view class="main-view-container"></router-view>
            <footer>coffeerights 2019</footer>
        </div>
    `,
    components: {
        bookApp,
        appHeader,
    },
    router: myRouter
})
