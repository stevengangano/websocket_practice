const path = require ("path");
//Getting from server.js to public folder
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

const express = require('express');
const app = express();

//needed to use public folder
app.use(express.static(publicPath))

//Runs on PORT localhost:7000
var PORT = process.env.PORT || 3000

app.listen(PORT, function(){
  console.log('Server Running');
});