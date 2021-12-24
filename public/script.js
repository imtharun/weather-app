"use strict";

const cnt = document.querySelector(".cnt");
const btn = document.querySelector(".btn");
const btnClear = document.querySelector(".btn__clear");
const input = document.querySelector(".inp");
const errorMsg = document.querySelector(".error__msg");

let details = [];

const insert = function (data) {
  const template = `<div class="relative w-48 bg-gray-200 rounded-xl px-8 py-5">
  <div>
  <h1 class="font-semibold text-2xl text-center">${data.name}</h1>
  </div>
  <div class="m-1">
  <h1 class="text-2xl text-bold text-center">
  ${data.temp}<span class="absolute top-14 right-16 text-sm">°C</span>
  </h1>
  </div>
  <div>
  <img class="mt-2 ml-3" src=${data.icon} alt="Icon" />
  </div>
  <p class="text-center mt-3 text-gray-400">
  ${data.description}
  </p>
  </div>`;
  cnt.insertAdjacentHTML("beforeend", template);
};

const errorHandler = () => {
  errorMsg.classList.remove("hidden");
  setTimeout(() => {
    errorMsg.classList.add("hidden");
  }, 3000);
};

document.addEventListener("DOMContentLoaded", () => {
  const obj = JSON.parse(localStorage.getItem("weather"));
  if (obj.length === 0) {
    return;
  } else {
    const [inner] = obj;
    details.push(inner);
    obj.forEach((ele) => insert(ele));
  }
});

btn.addEventListener("click", () => {
  const city = input.value.toLowerCase();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=984194dd94746feee232dea3756087e7`
  )
    .then((response) => response.json())
    .then((data) => {
      let obj = {};
      obj.name = data.name;
      obj.icon =
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/" +
        data.weather[0].icon +
        ".svg";
      obj.temp = Number.parseInt(data.main.temp) - 273;
      obj.description =
        data.weather[0].description.charAt(0).toUpperCase() +
        data.weather[0].description.slice(1);
      insert(obj);
      details.push(obj);
      localStorage.setItem("weather", JSON.stringify(details));
    })
    .catch(errorHandler);
  input.value = "";
});

btnClear.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});
