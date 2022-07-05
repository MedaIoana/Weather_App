let lat = document.getElementById("lat")
let lon = document.getElementById("lon")
let date = document.getElementById("date")
let error = document.getElementById("error") 

let max_temp = document.getElementById("max_temp")
let min_temp = document.getElementById("min_temp") 
let station_name = document.getElementById("station_name")
let rain = document.getElementById("rain")
let wind = document.getElementById("wind")
let chance = document.getElementById("chance")
let humidity = document.getElementById("humidity")
let icon = document.getElementById("img")

let temp7 = document.getElementById("temp7")
let temp11 = document.getElementById("temp11")
let temp15 = document.getElementById("temp15")
let temp19 = document.getElementById("temp19")
let temp23 = document.getElementById("temp23")

let mini_img1 = document.getElementById("mini_img1")
let mini_img2 = document.getElementById("mini_img2")
let mini_img3 = document.getElementById("mini_img3")
let mini_img4 = document.getElementById("mini_img4")
let mini_img5 = document.getElementById("mini_img5")

let allCards = document.getElementById("allCards")

let h7 = document.getElementById("h7")
let h11 = document.getElementById("h11")
let h15 = document.getElementById("h15")
let h19 = document.getElementById("h19")
let h23 = document.getElementById("h23")

check.addEventListener("click",()=>{
    let url = `https://api.brightsky.dev/weather?lat=${lat.value}&lon=${lon.value}&date=${date.value}`

    let checkFetch=function(response){
        if(!response.ok) throw Error(response.statusText+"- "+response.url)
        return response;
    }

    let checkClear=function(text){
        if(text.includes("clear")) return 1;
        if(text.includes("cloudy")) return 2
        return 0;
    }

    let checkHours=function(text,idH){
        let sunMoon = "sun"
        if(idH.id == "mini_img5") sunMoon = "moon"
        if(text.includes("partly-cloudy")) idH.innerHTML = `<i id = "${idH.id}" class='fas fa-cloud-${sunMoon}'></i>`
        else if(text.includes("cloudy")) idH.innerHTML = `<i id = "${idH.id}" class='fas fa-cloud'></i>`
        else if(text.includes("sleet")) idH.innerHTML = `<i id = "${idH.id}" class='fas fa-sleet'></i>`
        else if(text.includes("rain")) idH.innerHTML = `<i id = "${idH.id}" class='fas fa-rain'></i>`
        else if(text.includes("snow")) idH.innerHTML = `<i id = "${idH.id}" class='fas fa-snow'></i>`
        else if(text.includes("clear")) idH.innerHTML = `<i id = "${idH.id}" class='fas fa-${sunMoon}'></i>` 
    }

    fetch(url).then(checkFetch).then(response=>{
        return response.json()
    }).then(data=>{
        let max = -100.0
        let min = 100.0
        let avrg_precip = 0
        let avrg_speed = 0 
        let cloud_covr = 0
        let hum = 0
        let ic = ""
        let clear = 0
        let cloud = 0
        data.weather.forEach(element => {
            let aux = element.temperature;
            avrg_precip = avrg_precip + element.precipitation
            avrg_speed = avrg_speed + element.wind_speed
            cloud_covr = cloud_covr + element.cloud_cover
            hum = hum + element.relative_humidity
            ic = element.icon
            if(aux > max) max = aux
            if(aux < min) min = aux
            if(checkClear(element.icon) == 1) clear++
            if(checkClear(element.icon) == 2) cloud++
            
        });
        station_name.innerText = data.sources[0].station_name
        max_temp.innerHTML = `<i class='fas fa-sun'></i>${max}°C/`
        min_temp.innerHTML = `<i class='fas fa-moon'></i>${min}°C`
        avrg_precip = avrg_precip / data.weather.length
        avrg_precip = avrg_precip.toFixed(1)
        avrg_speed = avrg_speed / data.weather.length
        avrg_speed = avrg_speed.toFixed(1)
        cloud_covr = cloud_covr / data.weather.length
        cloud_covr = cloud_covr.toFixed(1)
        hum = hum / data.weather.length
        hum = hum.toFixed(1)
        rain.innerHTML = `<i class="fa-solid fa-cloud-rain"></i> Precipitations: ${avrg_precip}mm/h`
        wind.innerHTML = `<i class="fa-solid fa-wind"></i> Average wind speed: ${avrg_speed}km/h`
        chance.innerHTML = `<i class='fas fa-cloud-sun'></i> Average cloud cover: ${cloud_covr}%`
        humidity.innerHTML = `<i class='fas fa-water'></i> Humidity: ${hum}%`
        icon.innerHTML = `<i class='fas fa-${ic}'></i>`
        if(clear >= cloud) icon.innerHTML=`<i class='fas fa-sun'></i>`
        else icon.innerHTML = `<i class='fas fa-cloud-sun'></i>`
        temp7.innerText = data.weather[7].temperature+"°C"
        temp11.innerText = data.weather[11].temperature+"°C"
        temp15.innerText = data.weather[15].temperature+"°C"
        temp19.innerText = data.weather[19].temperature+"°C"
        temp23.innerText = data.weather[23].temperature+"°C"

        let text = data.weather[7].icon
        let idH = mini_img1
        checkHours(text,idH)
        
        text = data.weather[11].icon
        idH = mini_img2
        checkHours(text,idH)

        text = data.weather[15].icon
        idH = mini_img3
        checkHours(text,idH)

        text = data.weather[19].icon
        idH = mini_img4
        checkHours(text,idH)

        text = data.weather[23].icon
        idH = mini_img5
        checkHours(text,idH)
        
        error.innerText=""
    }).catch(function(err){
        console.log(err)
        station_name.innerText="Station not found"
        max_temp.innerText="?°C-"
        min_temp.innerText="?°C"
        rain.innerHTML=`<i class="fa-solid fa-cloud-rain"></i> Precipitations:-mm/h`
        wind.innerHTML=`<i class="fa-solid fa-wind"></i> Average wind speed:-km/h`
        chance.innerHTML=`<i class='fas fa-cloud-sun'></i> Average cloud cover:-%`
        humidity.innerHTML=`<i class='fas fa-water'></i> Humidity:-%`
        error.innerText=err
    })
})

allCards.addEventListener("click", showDetails,false)

function showDetails(e){
    if(e.target !== e.currentTarget){
        let hour = 0
        let hourId
        if(e.target.id === "h7" || e.target.id === "mini_img1" || e.target.id === "temp7" ) {
            hour = 7 
            hourId = h7
        }
        else if(e.target.id === "h11" || e.target.id === "mini_img2" || e.target.id === "temp11" ) {
            hour = 11
            hourId = h11
        }
        else if(e.target.id === "h15" || e.target.id === "mini_img3" || e.target.id === "temp15" ) {
            hour = 15
            hourId = h15
        }
        else if(e.target.id === "h19" || e.target.id === "mini_img4" || e.target.id === "temp19" ) {
            hour = 19
            hourId = h19
        }
        else if(e.target.id === "h23" || e.target.id === "mini_img5" || e.target.id === "temp23" ) {
            hour = 23
            hourId = h23
        }
        if(hour !== 0){
            let url = `https://api.brightsky.dev/weather?lat=${lat.value}&lon=${lon.value}&date=${date.value}`

            let checkFetch=function(response){
                if(!response.ok) throw Error(response.statusText+"- "+response.url)
                return response;
            }

            fetch(url).then(checkFetch).then(response=>{
                return response.json()
            }).then(data=>{
                hourId.innerHTML = `<p class="seven">
                                <span >${hour}:00</span>
                            </p>
                            <span class="sevenn">
                                Precipitation: ${data.weather[hour].precipitation}
                            </span>
                            <br>
                            <span class="sevenn">
                                Cloudy: ${data.weather[hour].cloud_cover}%
                            </span>
                            <br>
                            <span class="sevenn">
                                Humidity: ${data.weather[hour].relative_humidity}
                            </span>
                            <p class="celsius">
                                <span id="temp7">${data.weather[hour].temperature}°C</span>
                            </p>`
            }).catch(function(err){
                console.log(err)
                station_name.innerText="Station not found"
                max_temp.innerText="?°C-"
                min_temp.innerText="?°C"
                rain.innerHTML=`<i class="fa-solid fa-cloud-rain"></i> Precipitations:-mm/h`
                wind.innerHTML=`<i class="fa-solid fa-wind"></i> Average wind speed:-km/h`
                chance.innerHTML=`<i class='fas fa-cloud-sun'></i> Average cloud cover:-%`
                humidity.innerHTML=`<i class='fas fa-water'></i> Humidity:-%`
                error.innerText=err
            })
        } 
    }
    e.stopPropagation
}