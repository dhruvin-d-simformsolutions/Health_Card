const express = require('express');
require('./db/mongoose')

//PORT NUMBER
const port = process.env.PORT;

//Routers
const PatientRouter = require('./routes/patient');
const app = express();

app.use(express.json())
app.use('/patient',PatientRouter)

app.listen(port,()=>{
    console.log("Server running on port ",port);
})