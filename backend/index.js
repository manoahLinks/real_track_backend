require("dotenv").config();
const express = require('express'),
    app = express(),
    cors = require('cors'),
    axios = require('axios'),
    temperatureRoutes = require('./routes/temperature');


app.use(cors())    
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/temp', temperatureRoutes);

// setInterval(async () => {
    
//     const response = await axios.get(`https://api.thingspeak.com/channels/2571491/feeds.json?api_key=CMQGB44P9YIB6F6Q`);
//     console.log(response.data.feeds[response.data.feeds.length -1]);

//     await axios.post('http://localhost:8000/temp/', {temp: Number(response.data.feeds[response.data.feeds.length -1].field1) * 1000})

//     console.log('updated');

// }, 10000)

app.listen(process.env.PORT ,() => {
    console.log("iot_subgraph server is running on port:", process.env.PORT);
})