const fs = require('fs');
const express = require('express');
const cors = require('cors');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

// const mongoose = require('mongoose');


console.log(app.post);
console.log(fs);



app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    request('http://newsapi.org/v2/everything?q=bitcoin&from=2020-06-24&sortBy=publishedAt&apiKey=391abb8989774dd395a5782deacae973', function (error, response, body) {
        if (! error && response.statusCode == 200) {
            // console.log(req.body);
            var info = JSON.parse(body)
            // do more stuff

            // console.log(typeof(info.articles));
            const infoArticles = info.articles;
            infoArticles.forEach(article =>{
                console.log(article.title);
                console.log(article.author)
            })

            res.send(info);
        }
    })
});




app.listen(3000);
console.log("The server is now running on port 3000.");
