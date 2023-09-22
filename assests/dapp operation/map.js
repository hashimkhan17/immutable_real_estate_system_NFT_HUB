async function checkPlotlocation() {
    const registryNo = document.getElementById('address-input').value;

    try {
        const result = await nft_contract.methods.getLocation(registryNo).call();
        showMessage("");
         

        displayResult(result[0]);
        console.log(result);
        showMessage(result[1]);
    } catch (error) {
        console.error("Error calling contract function:", error);
        showMessage("Transaction failed: " + error.message);
    }
}


function displayResult(result1) {
    const result = result1;
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 30.267153, lng: -97.743061 }, 
        zoom: 65, 
        mapTypeId: 'satellite', 
    });

    let marker = null;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: result }, function (results, status) {
        if (status === 'OK' && results[0]) {
            const location = results[0].geometry.location;

            if (marker) {
                marker.setMap(null);
            }

           
            marker = new google.maps.Marker({
                position: location,
                map: map,
                title: result, 
            });

            
            map.setCenter(location);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

let popupShown = false; // Initialize a flag to track if the popup has been shown
function showMessage(message) {
    const messageElement1 = document.querySelector(".popup-container");
    const messageElement = document.getElementById("popup-content1");

    // Check if the popup has not been shown before
    if (message && message.ownerName && message.ownerCnic) {
        // Display the popup
        messageElement1.style.display = "block";
        messageElement.style.display = "block";

        // Create a formatted message with owner information
        const formattedMessage = `
            <p>Name: ${message.ownerName}</p>
            <p>CNIC: ${message.ownerCnic}</p>
           
        `;

        messageElement.innerHTML = formattedMessage;
    } else {
        // Display a  message if the input is not valid
        messageElement.textContent = message;
    }

    // Automatically close the popup after 10 seconds (10000 milliseconds)
    setTimeout(function () {
        messageElement1.style.display = "none";
    }, 10000); // Change to 10000 for 10 seconds
}


// Add event listener to the button
const checkButton = document.querySelector("#search-button");
checkButton.addEventListener("click", checkPlotlocation);

function loadPage() {
    // Load logic here
    console.log("Page loaded successfully.");
}
