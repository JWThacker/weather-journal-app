// Define the URL and api key to access data from OpenWeatherMap.org
const baseURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&zip=";
const apiKey = "&appid=0ac7c6bde32b5d4abbf2e641f2b90cbd";

// Add event listener to the generate button
document.querySelector("#generate").addEventListener("click", submitAction);

/*
 * 1. Retrieve weather data from openweathermap.org
 * 2. Post weather and user entered data to the app endpoint
 * 3. Update the UI
*/
function submitAction() {
  const zipCode = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;
  getWeatherData(baseURL, zipCode, apiKey)
      .then((data) => {
        postWeatherData("/addData", {
          temp: data.main.temp,
          dt: Date(data.dt),
          feels: feelings
        })
      .then((data) => {
          updatePage()
      });
      })
}

// Retrieve weather data from openweathermap.org
async function getWeatherData(url, zipCode, key) {
      const request = await fetch(url + zipCode + key);
      try{
        let responseData = await request.json();
        return responseData;
      } catch(error) {
        console.log("GET request error:/n", error);
      }
};

// Post weather and user entered data to the app endpoint
async function postWeatherData(url="", data={}) {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });

    try {
      const newData = await response.json();
      return newData;
    } catch(error) {
      console.log("error", error);
    }
};

// Update the UI
async function updatePage() {
  const request = await fetch("/allData");
  try {
    const allData = await request.json();
    console.log(allData);
    document.querySelector("#temp").innerHTML = Math.round(allData.temperature) + " degrees fahrenheit"
    document.querySelector("#content").innerHTML = allData.feels;
    document.querySelector("#date").innerHTML = allData.dt;

  } catch(error) {
    console.log("error", error);
  }
}