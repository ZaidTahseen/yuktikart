const { render } = require('ejs');
const User = require('../model/user')



exports.getLogin = (req, res) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isLoggedIn ,
        user_name :  req.session.user_name
    });
};




exports.postLogin = async (req, res) => {

    // it is coming from the person who is trying to login
    const email_f = req.body.email
    const password = req.body.password

    const user = await User.findOne({ email: email_f })

    if (!user || (password != user.password)) {
        return res.render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            isAuthenticated: false ,
            user_name : false
        });
    }

    // console.log(user)

    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.user_name = user.name

    req.session.save()

    res.redirect('/')


};






exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: req.session.isLoggedIn,
        user_name :  req.session.user_name
    });
};




exports.postSignup = async (req, res, next) => {


    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const confirmPassword = req.body.confirmPassword;

    const user = await User.findOne({ email: email })
    if (user) return res.redirect('/signup');

    const new_user = new User({
        email: email,
        password: password,
        name :name
    });

    await new_user.save()

    res.redirect('/login')


};


exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        // console.log(err);
        res.redirect('/');
    });
};
