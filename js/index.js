console.log("JavaScript file linked successfully!");

//Fetch data from an open API (Dog API)
//This fetch function makes a request to The Dog API to get a list of dog breeds
//The URL 'https://api.thedogapi.com/v1/breeds' is the endpoint where the data is stored
fetch('https://api.thedogapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => console.log("API Response:", data))
    .catch(error => console.error("Error fetching data:", error));