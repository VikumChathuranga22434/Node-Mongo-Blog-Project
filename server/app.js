const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connection uri to connect to mongoDB
const dbURI = 'mongodb+srv://netninja:test1234@cluster0.s9zcz2w.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result) => 
    // listen for the request
    app.listen(9001)
)
.catch((err) => { console.log(err) });

// register view engine
app.set('view engine', 'ejs');

// middileware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New Blog2',
        snippet: 'aboout my blog',
        body: 'more about my blog'
    });

    blog.save()
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

// find the all blogs
app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

// find a single blog
app.get('/single-blog', (req, res) => {
    Blog.findById('659ae4612c922e8c6f60cb50')
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

// custom middileware
// app.use((req, res, next) => {
//     console.log('New request made: ');
//     console.log('Host: ', req.hostname);
//     console.log('Path: ', req.path);
//     console.log('Method: ', req.method);
//     next();
// });

// app.use((req, res, next) => {
//     console.log('In the middileware');
//     next();
// });

// these are the blog routes
//sending the respose for the get method
// app.get('/', (req, res) => {

//     // res.send('<p>home page</p>');
//     // res.sendFile('../views/index.html', { root: __dirname }); we can write this if this app.js and the views in same directory
//     // res.sendFile(path.resolve(__dirname, '../views/index.html'));

//     // const blogs = [
//     //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//     //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//     //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//     // ];

//     // res.render(path.resolve(__dirname, '../views/index.ejs'), {
//     //     title: 'Home',
//     //     blogs
//     // });
//     // if the app.js is in the project file and the only index in the views is the index.ejs so we can use
//     // res.render('index'); to render the ejs file to the browser

//     res.redirect('/blogs');

// });

// // app.use((req, res, next) => {
// //     console.log('In the middileware 2');
// //     next();
// // });

// app.get('/about', (req, res) => {

//     // res.send('<p>about page</p>');
//     // res.sendFile('../views/about.html', { root: __dirname })
//     // res.sendFile(path.resolve(__dirname, '../views/about.html'));
//     res.render(path.resolve(__dirname, '../views/about.ejs'), { 
//         title: "About"
//     });

// });

// // rediract
// // app.get('/about-us', (req, res) => {
// //     res.redirect('/about');
// // });

// // blogs
// app.get('/blogs', (req, res) => {
//     Blog.find().sort({ createdAt: -1 })
//         .then((result) => {
//             res.render(path.resolve(__dirname, '../views/index.ejs'), {
//                 title: 'All Blogs',
//                 blogs: result
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// //create a path to the create file
// app.get('/blogs/create', (req, res) => {
//     res.render(path.resolve(__dirname, '../views/create.ejs'), {
//         title: "Crete a new Blog"
//     });
// });

// app.post('/blogs', (req, res) => { 
//     const blog = new Blog(req.body);

//     blog.save()
//         .then((result) => {
//             res.redirect('/blogs');
//         }).catch(() => {
//             console.log(err);
//         });
// });

// app.get('/blogs/:id', (req, res) => {
//     const id = req.params.id;

//     Blog.findById(id)
//         .then(result => {
//             res.render(path.resolve(__dirname, '../views/details.ejs'), {
//                 title: 'Blog Details',
//                 blog: result
//             });
//         }).catch((err) => {
//             console.log(err);
//         });
// });

// app.delete('/blogs/:id', (req, res) => {
//     const id = req.params.id;

//     Blog.findByIdAndDelete(id)
//         .then(result => {
//             res.json({ redirect: '/blogs' });
//         }).catch(err => console.log(err));
// });

//sending the respose for the get method
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { 
        title: "About"
    });
});

app.use('/blogs', blogRoutes);

//404 page
//this is need to place in the very bottom else it will trigger before other get function compiled
app.use((req, res) => {
    // res.status(404).sendFile(path.resolve(__dirname, '../views/404.html'));
    res.status(404).render(path.resolve(__dirname, './views/404.ejs'), { 
        title: "404"
    });
});