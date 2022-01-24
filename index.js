const express = require('express')
var url = require('url');
'use strict';
var fs = require('fs');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/add', (req, res) => {
    var queryData = url.parse(req.url, true).query;
   
    //fs.writeFile('history.json', json, 'utf8', callback);
    fs.readFile('history.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); 
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();

        // current seconds
        let seconds = date_ob.getSeconds();
        let datetime=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        thedata={"time":datetime,"tmp":queryData.temp,"humid":queryData.humid,"lumi":queryData.lumi,"rain":queryData.rain}
        obj.values.push(thedata); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('history.json', json, 'utf8', (err) => { 
            if (err) { 
              console.log(err); 
            } }); // write it back 
    }});
    fs.readFile('history.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); 
    res.send(obj.values[3])}})
  });

  app.get('/dashboard', (req, res) => {
    fs.readFile('history.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); 
        last10={"values":[]};
        for(var i=obj.values.length-10;i<obj.values.length;i++){
            last10.values.push(obj.values[i] );
        }
        res.send("Tle last 10 values are "+JSON.stringify(last10))
        }})
  });
 
app.listen(process.env.PORT || 5000,()=>{
    console.log('now listening for requests on port',process.env.PORT);});
