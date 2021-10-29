const express=require('express');
const app=express();
const https=require('https');
const bodyParser= require('body-parser');
const getKey = require('./key');
const key=require(__dirname+"/key.js");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(request,response){
    response.sendFile(__dirname+"/index.html");

})
app.post("/",function(request,response){
    console.log(request.body.cityName);
    var cityName= request.body.cityName;

    const url="https://api.openweathermap.org/data/2.5/weather?q=" + cityName+ getKey() ; //instead of getKey() use your own api key

    https.get(url,function(res){
        console.log(res.statusCode);
        res.on("data",function(data){
            const weatherData= JSON.parse(data);
            console.log(weatherData);

            
            
            
            
            
            
            if(res.statusCode===200){
                var description=weatherData.weather[0].description;
                response.render("city",{cityName: cityName,description: description, maxTemp: weatherData.main.temp_max, minTemp: weatherData.main.temp_min, temp: weatherData.main.temp, pressure: weatherData.main.pressure, windSpeed: weatherData.wind.speed})

            }else{
                response.render("error");
            }
        })

    });
})

app.post("/city",function(req,res){
    res.redirect("/");
})

app.post("/error",function(req,res){
    res.redirect("/");
})


    






app.listen(process.env.PORT || 3000,function(){
    console.log("server started on port 3000");
})