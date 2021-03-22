const express = require('express');
const morgan = require('morgan');
const path = require('path');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session);
const dotenv = require('dotenv');
const {
    connection
} = require('./db/mongoose')

dotenv.config()
connection()
// console.log(process.env.MONGODB_URL);


//PORT NUMBER
const port = process.env.PORT || 3000;


//Routers
const IndeRouter = require('./routes/main');
const PatientRouter = require('./routes/patient');
const LabRouter = require('./routes/lab');
const HistoryRouter = require('./routes/history');
const AdminRouter = require('./routes/admin');


const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

//Middlewares
app.use(morgan())
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(cors(corsOptions))

// Session
const storeToDatabase = new MongoDBStore({
    uri: process.env.MONGODB_URL,
    collection: "sessions"
})
app.use(session({
    secret: process.env.SECRETKEYFORSESSION,
    resave: false,
    cookie: {
        maxAge: new Date(Date.now() + 1000 * 30 ), // 1 week
    },
    saveUninitialized: false,
    store: storeToDatabase,
}))




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
app.use('/lab', LabRouter)
app.use('/history', HistoryRouter);
app.use('/admin', AdminRouter);

app.listen(port, () => {
    console.log("Server running on port ", port);
})