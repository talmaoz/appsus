import homepageCmp from './pages/home-page.cmp.js';
import aboutCmp from './pages/about-page.cmp.js';
import notesApp from './pages/notes-app.cmp.js';

export default [
    { path: '/', component: homepageCmp },
    { path: '/about', component: aboutCmp },
    { path: '/notes', component: notesApp },
]
