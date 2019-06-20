import homepageCmp from './pages/homepage.cmp.js';
import aboutCmp from './pages/about-page.cmp.js';
import notesApp from './pages/notes-app.cmp.js';
// import bookDetails from './pages/book-details.cmp.js';

export default [
    { path: '/', component: homepageCmp },
    { path: '/about', component: aboutCmp },
    { path: '/notes', component: notesApp },
    // { path: '/book/:theBookId', component: bookDetails },
]
