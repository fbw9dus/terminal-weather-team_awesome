const axios = require('axios')
const url   = require('url')
const http  = require('http')


const api_url = 'https://api.openweathermap.org/data/2.5/'
const api_endpoint = 'weather'
const forecast = 'forecast'
const args_city_name  = process.argv.slice(2)
const args_country  = process.argv.slice(3)
const api_key = '095ede2fbd5b22cb2417df240a904769'





async function getFive(city){
    const request_five_days = url.resolve(api_url, forecast) +`?q=${city}` + `&appid=${api_key}`

    try {
        const response = await axios.get(request_five_days)
        const data_forecast = await response.data

        let celsizus = data_forecast.list[1].main.temp - 273.15
        let fahrenheit = celsizus + 33.8
        let description_five = data_forecast.list[1].weather[0].description
        let five_final = `In the next five days the temperature will be ${celsizus.toFixed(2)}°C and the conditions will be: ${description_five}`

        return five_final

        
    } catch (error) {
        
    }
}
//getWheather()
//getFive()
async function getWheather(city){
        const request_url = url.resolve(api_url, api_endpoint) +`?q=${city}` + `&appid=${api_key}`
    
        try{
        const response = await axios.get(request_url)
        const data = await response.data
        
        let celsizus = data.main.temp - 273.15
        let fahrenheit = celsizus + 33.8
        let description = data.weather[0].description
        let final = `It is now ${celsizus.toFixed(2)}°C or ${fahrenheit.toFixed(2)}F in ${city}. The current weather conditions are: ${description}. `
        return final
         
    }
        catch(error){
            console.error(error)
        }
    
    
    }
async function cityForecast(request, response){
    response.setHeader("Content-Type", "text/html; charset=utf-8")
    const serverURL = request.url
    const city = serverURL.substring(1)
    
    console.log(city)
    
        const final = await getWheather(city)
        const five_final = await getFive(city)


   
    response.end(JSON.stringify(final + five_final))


        


}

const server = http.createServer(cityForecast)

server.listen(3005)