const express = require('express');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session);
const dotenv = require('dotenv');
const {
    connection
} = require('./db/mongoose')

//Env config
dotenv.config()

//Connect to the databse
connection()


//Passport Strategy
require('./Passport_Strategy/passport')(passport);


//PORT NUMBER
const port = process.env.PORT || 3000;


//Routers
const IndeRouter = require('./routes/main');
const PatientRouter = require('./routes/patient');
const HistoryRouter = require('./routes/history');
const AdminRouter = require('./routes/admin');


// Session Store into DB
const storeToDatabase = new MongoDBStore({
    uri: process.env.MONGODB_URL,
    collection: "sessions"
})


//Express Application
const app = express();


//Express Session
    // app.use(session({
    //     secret: process.env.SECRETKEYFORSESSION,
    //     resave: true,
    //     cookie: {
    //         maxAge: new Date(Date.now() + 1000 * 60 *24 *7 ), // 1 week
    //     },
    //     saveUninitialized: true,
    //     store: storeToDatabase,
    // }))


//Cors Configuration
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}


//Middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(cors(corsOptions))


//passport middleware
app.use(passport.initialize());
app.use(passport.session());



//CSRF DEMO
// app.set('view engine', 'pug')
// app.set('views', path.join(__dirname, 'view-files'))
// const csrfProtection = csrf({
//     cookie: true
// })
// app.get('/login', csrfProtection, (req, res, next) => {
//     res.render('las', {
//         csrfToken: req.csrfToken()
//     })
// })
// app.post("/login", formParser, csrfProtection, (req, res, next) => {
//     console.log("data authenticated")
// });


//Router
const csrfProtection = csrf()
app.get('/login',csrfProtection,(req,res,next)=>{
    res.header({
        'CSRF-Token' : req.csrfToken()
    }).send()
})
app.use('', IndeRouter);
app.use('/patient', PatientRouter);
app.use('/history', HistoryRouter);
app.use('/admin', AdminRouter);

app.listen(port, () => {
    console.log("Server running on port ", port);
})