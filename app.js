const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const multer = require('multer');


//Use body Parser in file
app.use(bodyParser.urlencoded({ extended: false }));



const User = require('./model/user');




// Setting ejs as a template engine for my project 
app.set('view engine', 'ejs');
app.set('views', 'views');


// Set public folder to the entire app.js 
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/images', express.static(path.join(__dirname, 'images')));





// Importing shop routes from routes folder 
const shopRoutes = require('./routes/shop.js')
const adminRoutes = require('./routes/admin.js')

// require('./prod')(app)


app.use((req, res, next) => {

    User.findById('5f6f5b1fed4a651ef0b35a92')
        .then(user => {
            req.user = user;
            // console.log(req.user)
            next();
        })
        .catch(err => console.log(err));
});





app.use('/shop', shopRoutes)
app.use('/admin', adminRoutes)



app.get('*', (req, res, next) => {
    res.send('Routes Not match !!!!!!!!!')
});


mongoose.connect('mongodb+srv://ekart:ekart123@cluster0.sibkp.mongodb.net/<dbname>?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
    .then((result) => {

        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Zaid',
                    email: 'zaidazmi56@gmail.com',
                    cart: {
                        items: []
                    }
                });

                user.save();
            }
        });

        console.log('DB Connected')
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log('Listening on Port 5000 ')
        })
    })
    .catch((err) => {
        console.log(err.message)
        console.log('DB Not connected !!!!  ')
    })

