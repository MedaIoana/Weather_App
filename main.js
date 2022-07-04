let lat=document.getElementById("lat")
let lon=document.getElementById("lon")
let date=document.getElementById("date")
let error=document.getElementById("error") 

let max_temp=document.getElementById("max_temp")
let min_temp=document.getElementById("min_temp") 
let station_name=document.getElementById("station_name")
let rain=document.getElementById("rain")
let wind=document.getElementById("wind")
let chance=document.getElementById("chance")
let humidity=document.getElementById("humidity")
let icon=document.getElementById("img")

let temp7=document.getElementById("temp7")
let temp11=document.getElementById("temp11")
let temp15=document.getElementById("temp15")
let temp19=document.getElementById("temp19")
let temp23=document.getElementById("temp23")

let mini_img1=document.getElementById("mini_img1")
let mini_img2=document.getElementById("mini_img2")
let mini_img3=document.getElementById("mini_img3")
let mini_img4=document.getElementById("mini_img4")
let mini_img5=document.getElementById("mini_img5")

check.addEventListener("click",()=>{
    let url=`https://api.brightsky.dev/weather?lat=${lat.value}&lon=${lon.value}&date=${date.value}`

    let checkFetch=function(response){
        if(!response.ok) throw Error(response.statusText+"- "+response.url)
        return response;
    }

    let checkClear=function(text){
        if(text.includes("clear")) return 1;
        if(text.includes("cloudy")) return 2
        return 0;
    }

    let checkHours=function(text){
        if(text.includes("partly-cloudy")) return 1
        else if(text.includes("cloudy")) return 2
        else if(text.includes("sleet")) return 3
        else if(text.includes("rain")) return 4
        else if(text.includes("snow")) return 5
        else if(text.includes("clear")) return 6
        return 0 
    }

    fetch(url).then(checkFetch).then(response=>{
        return response.json()
    }).then(data=>{
        let max=-100.0
        let min=100.0
        let avrg_precip=0
        let avrg_speed=0
        let cloud_covr=0
        let hum=0
        let ic=""
        let clear=0
        let cloud=0
        let index=0;
        data.weather.forEach(element => {
            let aux=element.temperature;
            avrg_precip=avrg_precip+element.precipitation
            avrg_speed=avrg_speed+element.wind_speed
            cloud_covr=cloud_covr+element.cloud_cover
            hum=hum+element.relative_humidity
            ic=element.icon
            if(aux>max) max=aux
            if(aux<min) min=aux
            if(checkClear(element.icon)==1) clear++
            if(checkClear(element.icon)==2) cloud++
            
        });
        station_name.innerText=data.sources[0].station_name
        max_temp.innerHTML=`<i class='fas fa-sun'></i>${max}°C/`
        min_temp.innerHTML=`<i class='fas fa-moon'></i>${min}°C`
        avrg_precip=avrg_precip/data.weather.length
        avrg_precip=avrg_precip.toFixed(1)
        avrg_speed=avrg_speed/data.weather.length
        avrg_speed=avrg_speed.toFixed(1)
        cloud_covr=cloud_covr/data.weather.length
        cloud_covr=cloud_covr.toFixed(1)
        hum=hum/data.weather.length
        hum=hum.toFixed(1)
        rain.innerHTML=`<i class="fa-solid fa-cloud-rain"></i> Precipitations: ${avrg_precip}mm/h`
        wind.innerHTML=`<i class="fa-solid fa-wind"></i> Average wind speed: ${avrg_speed}km/h`
        chance.innerHTML=`<i class='fas fa-cloud-sun'></i> Average cloud cover: ${cloud_covr}%`
        humidity.innerHTML=`<i class='fas fa-water'></i> Humidity: ${hum}%`
        icon.innerHTML=`<i class='fas fa-${ic}'></i>`
        if(clear>=cloud) icon.innerHTML=`<i class='fas fa-sun'></i>`
        else icon.innerHTML=`<i class='fas fa-cloud-sun'></i>`
        temp7.innerText=data.weather[7].temperature+"°C"
        temp11.innerText=data.weather[11].temperature+"°C"
        temp15.innerText=data.weather[15].temperature+"°C"
        temp19.innerText=data.weather[19].temperature+"°C"
        temp23.innerText=data.weather[23].temperature+"°C"

        let text=data.weather[7].icon
        if(checkHours(text)==1) mini_img1.innerHTML=`<i class='fas fa-cloud-sun'></i>`
        else if(checkHours(text)==2) mini_img1.innerHTML=`<i class='fas fa-cloud'></i>`
        else if(checkHours(text)==3) mini_img1.innerHTML=`<i class='fas fa-sleet'></i>`
        else if(checkHours(text)==4) mini_img1.innerHTML=`<i class='fas fa-rain'></i>`
        else if(checkHours(text)==5) mini_img1.innerHTML=`<i class='fas fa-snow'></i>`
        else if(checkHours(text)==6) mini_img1.innerHTML=`<i class='fas fa-sun'></i>`

        text=data.weather[11].icon
        if(checkHours(text)==1) mini_img2.innerHTML=`<i class='fas fa-cloud-sun'></i>`
        else if(checkHours(text)==2) mini_img2.innerHTML=`<i class='fas fa-cloud'></i>`
        else if(checkHours(text)==3) mini_img2.innerHTML=`<i class='fas fa-sleet'></i>`
        else if(checkHours(text)==4) mini_img2.innerHTML=`<i class='fas fa-rain'></i>`
        else if(checkHours(text)==5) mini_img2.innerHTML=`<i class='fas fa-snow'></i>`
        else if(checkHours(text)==6) mini_img2.innerHTML=`<i class='fas fa-sun'></i>`

        text=data.weather[15].icon
        if(checkHours(text)==1)mini_img3.innerHTML=`<i class='fas fa-cloud-sun'></i>`
        else if(checkHours(text)==2) mini_img3.innerHTML=`<i class='fas fa-cloud'></i>`
        else if(checkHours(text)==3) mini_img3.innerHTML=`<i class='fas fa-sleet'></i>`
        else if(checkHours(text)==4) mini_img3.innerHTML=`<i class='fas fa-rain'></i>`
        else if(checkHours(text)==5) mini_img3.innerHTML=`<i class='fas fa-snow'></i>`
        else if(checkHours(text)==6) mini_img3.innerHTML=`<i class='fas fa-sun'></i>`

        text=data.weather[19].icon
        if(checkHours(text)==1) mini_img4.innerHTML=`<i class='fas fa-cloud-sun'></i>`
        else if(checkHours(text)==2) mini_img4.innerHTML=`<i class='fas fa-cloud'></i>`
        else if(checkHours(text)==3) mini_img4.innerHTML=`<i class='fas fa-sleet'></i>`
        else if(checkHours(text)==4) mini_img4.innerHTML=`<i class='fas fa-rain'></i>`
        else if(checkHours(text)==5) mini_img4.innerHTML=`<i class='fas fa-snow'></i>`
        else if(checkHours(text)==6) mini_img4.innerHTML=`<i class='fas fa-sun'></i>`

        text=data.weather[23].icon
        if(checkHours(text)==1) mini_img5.innerHTML=`<i class='fas fa-cloud-moon'></i>`
        else if(checkHours(text)==2) mini_img5.innerHTML=`<i class='fas fa-cloud'></i>`
        else if(checkHours(text)==3) mini_img5.innerHTML=`<i class='fas fa-sleet'></i>`
        else if(checkHours(text)==4) mini_img5.innerHTML=`<i class='fas fa-rain'></i>`
        else if(checkHours(text)==5) mini_img5.innerHTML=`<i class='fas fa-snow'></i>`
        else if(checkHours(text)==6) mini_img5.innerHTML=`<i class='fas fa-moon'></i>`
        
        console.log(data.weather[7].icon)
        console.log(data.weather[11].icon)
        console.log(data.weather[15].icon)
        console.log(data.weather[19].icon)
        console.log(data.weather[23].icon)
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

