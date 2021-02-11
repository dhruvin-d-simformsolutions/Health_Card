const express = require('express');
require('./db/mongoose')

//PORT NUMBER
const port = process.env.PORT;

//Routers
const IndexRouter = require('./routes/main');
const PatientRouter = require('./routes/patient');
const LabRouter = require('./routes/lab');
const app = express();

app.use(express.json())


app.use('',IndexRouter);
app.use('/patient', PatientRouter);
app.use('/lab',LabRouter)


app.listen(port,()=>{
    console.log("Server running on port ",port);
})