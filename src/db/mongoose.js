const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/Health_Card', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false, //removing deprication warning
// })

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : true,
    useUnifiedTopology: true,
})