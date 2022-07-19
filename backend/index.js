const express = require('express');
const app = express();
const connect = require('./db');
const cors = require('cors');

app.use(cors());
//Connecting to database
connect();

//Using Routes
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


app.get("/",(req,res)=>{
    console.log(res.statusCode);
    console.log(res.setHeader);
    res.send("Hello");
})

app.listen(process.env.PORT || 3003, ()=>{
    console.log("Server is up and running");
});
