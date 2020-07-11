const apiKey = "b93f4a263bb3effa1c78910efc5585d2";
const url = "https://api.openweathermap.org/data/2.5/weather?";
const buton = document.querySelector(".change-temp-to");
let displayUnit = "";
let unitLocalStorage = localStorage.getItem("units");
// console.log(unitLocalStorage);
let buttonDisplayUnit = document.querySelector(".span-class");
// console.log(buttonDisplayUnit);
if (!unitLocalStorage) {
  unitLocalStorage = "metric";
  localStorage.setItem("units", "metric");
}

// console.log(unitLocalStorage);
let unit = `units=${unitLocalStorage}`;
// console.log(unit);

function getData(param) {
  const lon = param.coords.longitude;
  const lat = param.coords.latitude;
  const celsius = document.querySelector(".cel");
  const fahrenheitt = document.querySelector(".far");
  const apiURL = `${url}lat=${lat}&lon=${lon}&${unit}&appid=${apiKey}`;
  //   console.log(apiURL);
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      if (unitLocalStorage === "metric") {
        displayUnit = " C";
      } else {
        displayUnit = " F";
      }
      const skyStatus = data.weather[0].description;

      //   console.log(data);
      //   console.log(displayUnit);
      document.querySelector(".loc").innerHTML = "Location: " + data.name;
      document.querySelector(".temp").innerHTML =
        "Temp: " + data.main.temp + "°" + displayUnit;
      buttonDisplayUnit.innerHTML = displayUnit;
      document.querySelector(".temp").innerHTML += ` --  ${skyStatus}`;
      //   console.log(data.weather[0].description);
    });
}

function errorMsg(err) {
  console.log(err);
  document.querySelector(".loc").style.display = "none";
  document.querySelector(".temp").style.display = "none";
  document.querySelector(".change-temp-to").style.display = "none";
  document.querySelector(".error-msg").style.display = "initial";
}
navigator.geolocation.getCurrentPosition(getData, errorMsg);

function changeTemp() {
  //   console.log("Button clicked");
  if (unit === "units=metric") {
    unit = "units=imperial";
    displayUnit = " F";
    unitLocalStorage = "imperial";
    localStorage.setItem("units", "imperial");
    // console.log(unitLocalStorage);
  } else {
    unit = "units=metric";
    displayUnit = " C";
    unitLocalStorage = "metric";
    localStorage.setItem("units", "metric");
  }

  navigator.geolocation.getCurrentPosition(getData, errorMsg);
}

buton.addEventListener("click", changeTemp);
