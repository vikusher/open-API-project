// Function to fetch and display the list of dog breeds
async function fetchBreeds() {
    try {
        let response = await fetch('https://api.thedogapi.com/v1/breeds');
        let breeds = await response.json();
        console.log("API Response:", breeds); // Debugging: check response data

        let breedsList = document.getElementById("breedsList");
        breedsList.innerHTML = ""; // Clear previous list

        breeds.forEach(breed => {
            let listItem = document.createElement("li");
            listItem.textContent = breed.name;

            // Debugging: Check if click event is attached
            console.log(`Adding event listener to ${breed.name}`);

            listItem.addEventListener("click", () => fetchBreedDetails(breed, listItem));
            breedsList.appendChild(listItem);
        });

    } catch (error) {
        console.error("Error fetching breeds:", error);
    }
}

// Function to fetch and display breed details with image
async function fetchBreedDetails(breed, listItem) {
    console.log(`Fetching details for ${breed.name}`); // Debugging

    // Check if the details are already displayed
    let dogInfo = listItem.querySelector("#dogInfo");
    if (dogInfo) {
        // If details are already displayed, remove them
        listItem.removeChild(dogInfo);
        return;
    }

    let imageUrl = "https://via.placeholder.com/200"; // Default image

    // Fetch image using reference_image_id if available
    if (breed.reference_image_id) {
        try {
            let imageResponse = await fetch(`https://api.thedogapi.com/v1/images/${breed.reference_image_id}`);
            let imageData = await imageResponse.json();
            console.log("Image Data:", imageData); // Debugging: check image data
            imageUrl = imageData.url || imageUrl; // Use fetched image URL if available
            console.log("Fetched Image URL:", imageUrl); // Debugging: check fetched image URL
        } catch (error) {
            console.error(`Error fetching image for ${breed.name}:`, error);
        }
    }

    // Debugging: Check if we got all breed details
    console.log(`Breed details:`, breed);

    // Display breed details under the clicked list item
    listItem.innerHTML += `
        <div id="dogInfo">
            <img src="${imageUrl}" alt="${breed.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/200';">
            <div id="dogDetails">
                <h2>${breed.name}</h2>
                <p><strong>Origin:</strong> ${breed.origin || "Unknown"}</p>
                <p><strong>Temperament:</strong> ${breed.temperament || "Not Available"}</p>
                <p><strong>Life Span:</strong> ${breed.life_span || "Not Available"}</p>
            </div>
        </div>
    `;
}
// Attach event listener to button
document.getElementById("loadBreedsBtn").addEventListener("click", fetchBreeds);