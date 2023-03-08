const getLoc=async()=>{

    const url = 'http://ip-api.com/json/?fields=status,country,city,lat,lon,timezone';

    const response= await fetch(url);
    const data= await response.json();
    console.log(data);
    return data;


 }




 const getWeather=async(lat,lon)=>{

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=25f29a5441f76319230add4a270e9471`;

   
    const response= await fetch(url);
    const data= await response.json();
      console.log(data);
    return data;


 }


 function getDayOrNight(){
    let DayOrNight;
    let d= new Date();
     
    if((d.getHours() >= 6) && (d.getHours <= 19))
    {
      DayOrNight='Day';

    }else{
      DayOrNight='Night'

    }
    return DayOrNight;
 }


 function getIcon(weMain){
   let icon;
   switch (weMain) {
       case 'Thunderstorm':
           icon = `${weMain}.svg`;
           break;
       case 'Drizzle':
           icon = `${weMain}.svg`;
           break;
       case 'Rain':
           icon = `${weMain}.svg`;
           break;
       case 'Snow':
           icon = `${weMain}.svg`;
           break;
       case 'Clear':
           const DayOrNigh = getDayOrNight();
           icon = `${weMain}-${DayOrNigh}.svg`;
           break;
       case 'Clouds':
           icon = `${weMain}.svg`;
           break;
       case 'Atmosphere':
           icon = `${weMain}.png`;
           break;
       case 'Haze':
           icon = `${weMain}.png`;
         
           break;
   }
  
   return icon;
}

function getTemp(weTemp){
   const k = weTemp;
   const f = (k - 273.15) * 9/5 + 32;
   const c = k - 273.15;
   return temp = {kel:Math.floor(k), far:Math.floor(f), can:Math.floor(c)};
}

function getTemp(weTemp2){
   const k = weTemp2;
   const f = (k - 273.15) * 9/5 + 32;
   const c = k - 273.15;
   return temp = {kel:Math.floor(k), far:Math.floor(f), can:Math.floor(c)};
}

const degsec=document.querySelector('.degree-section');
const locti=document.querySelector('.timezone');
const icons= document.querySelector('.icon');

const deg= document.querySelector('.degree');
const unit=document.querySelector('.degree-section span');
const tede=document.querySelector('.temperature-description');
const feelsLike=document.querySelector('.feels-like');
const unit2=document.querySelector('.feels span');
const background=document.querySelector('.background');

window.addEventListener('load',function(){

   getLoc()
        .then(locData => {
         locti.textContent=locData.timezone;

        getWeather(locData.lat,locData.lon)
            .then(weData =>{
              const weTemp= weData.main.temp;
              const weMain=weData.weather[0].main;
              const weDes = weData.weather[0].description;
              const iconName=getIcon(weMain);
              const feLike=weData.main.feels_like;
              const weTemp2= weData.main.temp;

               icons.innerHTML=`<img src='icons/${iconName}'></img>`;

              deg.textContent=Math.floor(weTemp);
              deg.textContent = getTemp(weTemp).far;
              unit.textContent='F';
              feelsLike.textContent=Math.floor(feLike) ;
              feelsLike.textContent = getTemp(weTemp2).far;
              unit2.textContent='F'
              degsec.addEventListener('click',()=>{
               if(unit.textContent=='F'){
                   deg.textContent = getTemp(weTemp).can;
                  unit.textContent='C'
               }else{
                  deg.textContent = getTemp(weTemp).far;
                  unit.textContent='F';
               }



               if(unit2.textContent=='F'){
                  feelsLike.textContent = getTemp(weTemp2).can;
                 unit2.textContent='C'
              }else{
               feelsLike.textContent = getTemp(weTemp2).far;
                 unit2.textContent='F';
              }

              })
              tede.textContent = weDes;
              const DayOrNigh = getDayOrNight();
              if(weMain =='Clouds'){
               document.getElementById('background').style.backgroundImage="url('images/cloudy.jpg') " ;
              }else if(weMain =='Rain'){
               document.getElementById('background').style.backgroundImage="url('images/rainy.jpg') " ;
              }else if(weMain =='Clear' && DayOrNigh=='Night' ){
               document.getElementById('background').style.backgroundImage="url('images/night.jpg') " ;
              }else if(weMain =='Clear' && DayOrNigh=='Day' ){
               document.getElementById('background').style.backgroundImage="url('sunny/night.jpg') " ;
              }else if(weMain =='Snow'){
               document.getElementById('background').style.backgroundImage="url('images/snow.gif') " ;
              }
             
    

            })
        })

});