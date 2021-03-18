const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const dotenv = require('dotenv');
const {connection} = require('./db/mongoose')

// dotenv.config({path : '../Config/dev.env'})
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
const AdminRouter = require('./routes/admin')
const app = express();

app.use(express.json())
const storeToDatabase = new MongoDBStore({
    uri : process.env.MONGODB_URL,
    collection : "sessions"
})

app.use(session({
    secret : "secret",
    resave : false,
    saveUninitialized : false,
    store : storeToDatabase,
}))

// app.use((req,res,next) => {
//     if (!req.session.user) {
//         return next()
//     }
// })

app.use('',IndeRouter);
app.use('/patient', PatientRouter); //http://localhost:3000/patient/
app.use('/lab',LabRouter)
app.use('/history',HistoryRouter);  
app.use('/admin',AdminRouter);  


app.listen(port,()=>{
    console.log("Server running on port ",port);
})