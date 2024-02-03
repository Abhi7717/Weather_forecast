// import React from 'react';
const { log } = require("console");
const express = require("express")
const app = express();
const https = require("https")
const bodyParser=require("body-parser")

app.use(express.static("public"));
// let urll="";
app.use(bodyParser.urlencoded({extended:true}))

app.get("/" , function (req, res) {
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
    // console.log(req.body.cityName)
    const query=req.body.cityName
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=4fc56c42c8eba8f25fb55e31e25fe6cf&units="+unit
    // urll=url;
    https.get(url,function(response)
    {
        console.log(response.statusCode)

        response.on("data",function(data)
        {
            // console.log(data)
            const weatherdata=JSON.parse(data)
            // console.log(weatherdata)

            const temp=weatherdata.main.temp;
            const country=weatherdata.sys.country;
            const pres=weatherdata.main.pressure;
            const humid=weatherdata.main.humidity;

            const weatherdesc=weatherdata.weather[0].description
            const icon=weatherdata.weather[0].icon
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
          
        res.write("<h1>Weather of "+query+" is = "+weatherdesc+"</h1>")
        res.write("<h1>Temperature  is : "+temp+"°C     Atmospheric Pressure is : "+pres+"      Humidity is : "+humid+"</h1>")
        res.write("<h1>Country : "+country+"</h1>")
        res.write("<h3>icon : </h3>")
        res.write("<img src="+imageURL+">")
        if (weatherdesc.includes("scattered clouds")){
             let weatherClass='white-cloud-blue-sky.jpg'
           
            res.write(` <html>
            <head>
                <style>
                    body {
                        background-image: url(${weatherClass});
                        background-size: cover;
                        background-position: center;
                    }
                </style>
            </head>
            
            </html>`)
            
         } else if (weatherdesc.includes("haze")){
            let weatherClass='haze.jpg'
            
            res.write(` <html>
            <head>
                <style>
                    body {
                        background-image: url(${weatherClass});
                        background-size: cover;
                        background-position: center;
                    }
                </style>
            </head>
            
            </html>`)
         }else if (weatherdesc.includes("cloud") ) {
            let weatherClass='lonely-meadow-with-sky-background.jpg'
            res.write(` <html>
            <head>
                <style>
                    body {
                        background-image: url(${weatherClass});
                        background-size: cover;
                        background-position: center;
                    }
                </style>
            </head>
            
            </html>`)
         }else if (weatherdesc.includes("rain")) {
            
            let weatherClass=' rainclouds-rain-blue-sky_149267-652.jpg'
            res.write(` <html>
            <head>
                <style>
                    body {
                        background-image: url(${weatherClass});
                        background-size: cover;
                        background-position: center;
                    }
                </style>
            </head>
            
            </html>`)
             }else if (weatherdesc.includes("clear sky")) {
            
                let weatherClass='cloud-blue-sky.jpg'
                res.write(` <html>
                <head>
                    <style>
                        body {
                            background-image: url(${weatherClass});
                            background-size: cover;
                            background-position: center;
                        }
                    </style>
                </head>
                
                </html>`)
            }else if (weatherdesc.includes("mist") || weatherdesc.includes("smoke")) {
            
                let weatherClass='mist.jpg'
                res.write(` <html>
                <head>
                    <style>
                        body {
                            background-image: url(${weatherClass});
                            background-size: cover;
                            background-position: center;
                        }
                    </style>
                </head>
                
                </html>`)
            }
            else if (weatherdesc.includes("fog")) {
            
                let weatherClass='fog.jpg'
                res.write(` <html>
                <head>
                    <style>
                        body {
                            background-image: url(${weatherClass});
                            background-size: cover;
                            background-position: center;
                        }
                    </style>
                </head>
                
                </html>`)
            }else if (weatherdesc.includes("thunder")){
                let weatherClass='thunder.jpg'
                
                res.write(` <html>
                <head>
                    <style>
                        body {
                            background-image: url(${weatherClass});
                            background-size: cover;
                            background-position: center;
                        }
                    </style>
                </head>
                
                </html>`)
            }

        res.send()
        })

       
        
    })
    
    console.log("post request received")
})
// export default App;

// In this setup, the Node.js code makes the API request using https.get and then extracts the relevant weather data. However, Node.js cannot directly change the background image of the browser as it runs on the server-side. Instead, it sends the weather data to the client-side using Express.js to serve the HTML file and JSON data. The client-side JavaScript code (the one in weather-script.js) is responsible for updating the background image and displaying the weather information based on the data received from the server.

// To run this code, you need to have Node.js installed on your system. Save the above code in separate files (index.html and weather-script.js) and create a new directory called public in the same location as the files. Put your weather images (default-image.jpg, clear-image.jpg, etc.) inside the public directory. Then, execute the Node.js script using the command node weather-script.js. This will start the server on port 4000. Open your browser and navigate to http://localhost:4000 to see the Weather App.

// res.write("<img src="+weatherClass+">") pahle ye tha fir iske badd background change krna tha tho avi jysa hai wasa set kr diye.

app.listen(4000, function () {
    console.log("server is running")
})



// Clear Sky: Sunny weather with no significant cloud cover.
// Cloudy: Overcast sky with varying degrees of cloud cover.
// Rainy: Precipitation in the form of rain, ranging from light drizzle to heavy downpour.
// Thunderstorms: Storms accompanied by thunder, lightning, and heavy rain.
// Foggy/Misty: Reduced visibility due to the presence of fog or mist.
// Hazy: Reduced visibility due to suspended particles in the air.
// Snowfall: In higher-altitude regions, particularly in northern India.
// Hot and Dry: High temperatures with low humidity, common in certain regions during summer.
// Cold and Dry: Low temperatures with low humidity, common in winter in northern regions.
// Monsoon: Seasonal winds bringing heavy rain, especially in the coastal and northern regions during the monsoon season.



