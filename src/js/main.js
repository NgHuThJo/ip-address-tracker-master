import { fetchData } from "./fetch.js";
import { isInputValid } from "./input-validation.js";
import { setupMap } from "./map.js";

function renderData(data) {
    if(!data) {
        return;
    } 

    const infoContainer = document.querySelectorAll(".info span");
    const relevantData = [
        data["ip"],
        String().concat(data["location"]["city"], ", ", data["location"]["region"], " ", data["location"]["postalCode"]),
        String().concat("UTC ", data["location"]["timezone"]),
        data["isp"]
    ];

    infoContainer.forEach((element, index) => {
        element.textContent = relevantData[index];
    });

    console.log(infoContainer);
}

// Entry point of script
function main() {
    const apiInfo = {
        baseURL: "https://geo.ipify.org/api/v2/country,city?",
        apiKey: "at_PQF9G6sDYOiNZ48BlfqgU18dFJB9J",
    }

    const queryStringParameters = new URLSearchParams({
        apiKey: apiInfo.apiKey,
        ipAddress: null, 
    }); 

    let data; 
    let coords = [51.505, -0.09];
    // Form element which contains text input
    const form = document.querySelector(".form");
    const map = L.map("map", {
        zoomControl: false,
    });
    // Check if IP address is valid
    // Word boundary ensures that IP address does not end with "."
    const regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;

    window.addEventListener("DOMContentLoaded", () => {
        const locationInfo = localStorage.getItem("locationInfo");

        if(locationInfo) {
            data = JSON.parse(locationInfo);
            coords = [data["location"]["lat"], data["location"]["lng"]];
        }

        setupMap(map, coords);
        renderData(data);
    });

    form.addEventListener("submit", async (e) => {
        // Prevent form from being submitted to server
        e.preventDefault();
        const value = form.querySelector("input").value;

        if(isInputValid(value, regex)) {
            // Set and get methods accept query parameter as string
            queryStringParameters.set("ipAddress", value);
            const queryString = queryStringParameters.toString();
            data = await fetchData(apiInfo.baseURL.concat(queryString));
            localStorage.setItem("locationInfo", JSON.stringify(data));
            coords = [data["location"]["lat"], data["location"]["lng"]];
            setupMap(map, coords);
            renderData(data);
        }
    });
}

main();