var express = require('express');
var app = express();
var request = require('request');

app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
    res.render("search");
});

app.get('/results',function(req,res){
    // var str = 'http://starlord.hackerearth.com/movieslisting/';
    var str = 'http://www.omdbapi.com/?apikey=b1c7b347&s=' + req.query.search;
    request(str,function(error,response,body){
        if(!error && response.statusCode == 200){
            var results = JSON.parse(body);
            // console.log(results);
            res.render('results',{data : results});
        }
    });
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" ,function(){
    console.log("Server Started On localhost:3000");
});
