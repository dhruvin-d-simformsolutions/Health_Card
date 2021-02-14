const express = require('express');
require('./db/mongoose')

//PORT NUMBER
const port = process.env.PORT;

//Routers
const IndexRouter = require('./routes/main');
const PatientRouter = require('./routes/patient');
const LabRouter = require('./routes/lab');
const HistoryRouter = require('./routes/history');
const AdminRouter = require('./routes/admin')
const app = express();

app.use(express.json())


app.use('',IndexRouter);
app.use('/patient', PatientRouter);
app.use('/lab',LabRouter)
app.use('/history',HistoryRouter);  
app.use('/admin',AdminRouter);  


app.listen(port,()=>{
    console.log("Server running on port ",port);
})