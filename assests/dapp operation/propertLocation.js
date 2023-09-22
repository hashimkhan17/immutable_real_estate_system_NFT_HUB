// Assuming you have initialized and connected to web3 and obtained the contract instance

// Handle the form submission
const form = document.querySelector("#propertyForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get the property number entered by the user
  const propertyNumber = document.querySelector("#propertyNumber").value;

  try {
    // Call the smart contract function to get the location and owner information
    const result = await contract.methods.getLocation(propertyNumber).call();

    // Extract the longitude and latitude values from the result
    const [longitude, latitude] = result.gps.split(",");

    // Display the location on a Google Map
    displayPropertyLocation(latitude, longitude);

    // Display the owner information in a box
    displayOwnerInformation(result.kki);
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
});

// Function to display the property location on a Google Map
function displayPropertyLocation(latitude, longitude) {
  // Initialize the Google Map
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
    zoom: 16, // Adjust the zoom level as needed
  });

  // Add a marker to the property location
  new google.maps.Marker({
    position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
    map: map,
  });
}

// Function to display the owner information in a box
// Function to display the owner information in a popup
function displayOwnerInformation(ownerInfo) {
    // Get the modal element
    const modal = document.getElementById("ownerModal");
  
    // Get the content element inside the modal
    const modalContent = document.getElementById("ownerModalContent");
  
    // Update the content with the owner information
    modalContent.textContent = ownerInfo;
  
    // Show the modal
    modal.style.display = "block";
  
    // Close the modal when the user clicks outside of it
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  }

  
//   <!-- Modal container -->
// <div id="ownerModal" class="modal">
//   <!-- Modal content -->
//   <div class="modal-content">
//     <span class="close">&times;</span>
//     <div id="ownerModalContent"></div>
//   </div>
// </div>

/* Modal styles */
// .modal {
//     display: none; /* Hide the modal by default */
//     position: fixed;
//     z-index: 1;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     overflow: auto;
//     background-color: rgba(0, 0, 0, 0.4); /* Add transparency to the background */
//   }
  
//   /* Modal content styles */
//   .modal-content {
//     background-color: #fefefe;
//     margin: 15% auto; /* Adjust the margin to center the modal */
//     padding: 20px;
//     border: 1px solid #888;
//     width: 80%;
//     max-width: 600px;
//   }
  
//   /* Close button styles */
//   .close {
//     color: #aaa;
//     float: right;
//     font-size: 28px;
//     font-weight: bold;
//   }
  
//   .close:hover,
//   .close:focus {
//     color: #000;
//     text-decoration: none;
//     cursor: pointer;
//   }
  