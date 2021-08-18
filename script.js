console.log('script works');

let UNIT = '';
let CITY = '';
let weatherData;
let colonToggle = true;

async function getWeatherData() {
    const url = 'https://api.tutiempo.net/json/?lan=en&apid=awTqqzXXXzzfcOg&lid=3768';
    const data = await (await fetch(url)).json();
    weatherData = data;
    console.log(data)
    UNIT = weatherData.information.temperature;
    CITY = weatherData.locality.name
    renderData();
}


function renderData() {
    setTime();
    setDayDate();
    setCity();
    setMainTemp();
    setMainMinMaxTemp();
    setNextDays();
}

function setMainTemp() {
    const mainTemp = document.querySelector('.main-temp');
    const currHour = moment().format('h:00');
    let currTemp = '';
    Object.keys(weatherData.hour_hour).forEach(el => {
        if (weatherData.hour_hour[el].hour_data === currHour) {
            currTemp = weatherData.hour_hour[el].temperature;
        }
    });
    mainTemp.innerHTML = currTemp + UNIT;
}

function setMainMinMaxTemp() {
    const mainMinMaxTemp = document.querySelector('.temp-min-max');
    mainMinMaxTemp.innerHTML = `${weatherData.day1.temperature_min}${UNIT} / ${weatherData.day1.temperature_max}${UNIT}`
}

function setCity() {
    const city = document.querySelector('.city');
    city.innerHTML = `${CITY}`
}

function setNextDays() {
    for (let i = 1; i < 4; i++) {
        const dayNode = document.querySelector('.next-day' + i);
        setNextDay(dayNode, i);
    }
}

function setNextDay(dayNode, i) {
    const dayObj = weatherData[`day${i + 1}`];
    const day = moment(dayObj.date, 'YYYY-M-DD').format('dddd')
    dayNode.innerHTML = `
            <div>${day}</div>
            <div class="temp">${dayObj.temperature_min}${UNIT}</div>
            <div class="temp">${dayObj.temperature_max}${UNIT}</div>
    `
}

function setDayDate() {
    const dayDateTime = document.querySelector('.day-date');
    const day = moment().format('dd');
    const date = moment().format('DD.MM.YYYY');
    dayDateTime.innerHTML = `${day}, ${date}`
}

function setTime() {
    setInterval(() => {
        const time = document.querySelector('.time');
        const currTime = moment().format(colonToggle ? 'hh:mm' : 'hh mm');
        time.innerHTML = currTime;
        colonToggle = !colonToggle;
    }, 1000);
}

getWeatherData();