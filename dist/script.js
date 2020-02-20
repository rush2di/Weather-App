const input = document.querySelector("#country");
const button = document.querySelector(".sub-btn");
let container = document.querySelector(".container");
let iconUi = document.querySelector(".icon");
let card = document.querySelector(".card");
let apiKey = "34a6ffdea678ea3f993bfc312ff50714";
let info;

// async data fetch function
const data = async country => {
  try {
    let api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${country}&&appid=${apiKey}`
    );
    let res = await api_call.json();
    return res;
  } catch (err) {
    console.error(err.message);
  }
};

// Kelvin to Celsuis converter
let converter = kelvin => {
  if (kelvin < 0) {
    return "below absolute zero (0 K)";
  } else {
    let calc = kelvin - 273.15;
    return Math.round(calc) + " c";
  }
};

let bgSwitch = description => {
  switch (description) {
    case "Clouds":
      return (container.style.backgroundImage = "url(assets/clouds.jpg)");
    case "Clear":
      return (container.style.backgroundImage = "url(assets/clear-sky.jpg)");
    case "Rain":
      return (container.style.backgroundImage = "url(assets/rain.jpg)");
    case "Thunderstorm":
      return (container.style.backgroundImage = "url(assets/thunderstorm.jpg)");
    case "Snow":
      return (container.style.backgroundImage = "url(assets/snow.jpg)");
    case "Mist":
      return (container.style.backgroundImage = "url(assets/mist.jpg)");
    default:
      return (container.style.backgroundImage = "url(assets/mist.jpg)");
  }
};

// function to render data into dom
let render = data => {
  const { icon, description, main } = data.weather[0];
  const { name, sys } = data;
  let city_temp = converter(data.main.temp);
  bgSwitch(main);
  let disc = document.querySelector("#discription");
  let countryUi = document.querySelector("#country-name");
  let city = document.querySelector("#city");
  let rise = document.querySelector("#sunrise");
  let set = document.querySelector("#sunset");
  let temp = document.querySelector(".temp");
  let wind = document.querySelector(".wind");
  iconUi.style.backgroundImage = `url(https://openweathermap.org/img/wn/${icon}@2x.png)`;
  disc.innerHTML = description;
  city.innerHTML = name;
  countryUi.innerHTML = sys.country;
  rise.innerHTML = new Date(sys.sunrise * 1000).toGMTString().substring(16);
  set.innerHTML = new Date(sys.sunset * 1000).toGMTString().substring(16);
  temp.innerHTML = city_temp;
  wind.innerHTML = `<div><span>wind speed: </span>${data.wind.speed}/ms</div> <div><span>wind direction: </span>${data.wind.deg} deg</div>`;
};

// button submit handler
button.addEventListener("click", e => {
  e.preventDefault();
  if (input.value.length > 3) {
    data(input.value).then(res => {
      card.classList.remove("change");
      card.classList.add("enter");
      card.style.opacity = "1";
      render(res);
    });
    if (card.classList.contains("enter")) {
      card.classList.toggle("change");
    }
  }
});
