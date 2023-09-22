const btn1 = document.querySelector("#submit");
btn1.addEventListener("click", getMyProperties);

// Function to get the caller's properties
async function getMyProperties() {
  try {
    const result = await nft_contract.methods.myProperties().call({ from: myaccount[0] });
    console.log(result); // Log the result for debugging
    displayMyProperties(result[0], result[1]); // Call the display function with the result arrays
  } catch (error) {
    console.log("Error calling contract function:", error);
    showMessage(error);
  }
}

// Function to display the caller's properties
function displayMyProperties(tokenIds, propertyData) {
  const propertyList = document.getElementById("propertyList");
  propertyList.innerHTML = "";

  // Create a table
  const table = document.createElement("table");

  // Create the table header row
  const headerRow = table.insertRow();
  const headers = ["No","NFT id", "Housing SOciety", "Phase", "Street No", "Plot No", "Registry No", "Plot Area", "Land Location", "Land Nature"];
  for (const header of headers) {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  }

  // Iterate through property data and populate the table
  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];
    const property = propertyData[i];

    const row = table.insertRow();
    const values = [
      i+1,
      tokenId,
      property.housingsociety,
      property.phase,
      property.streetNo,
      property.plotNo,
      property.registryNo,
      property.plotarea,
      property.landLocation,
      property.landnature
    ];

    for (const value of values) {
      const cell = row.insertCell();
      cell.textContent = value;
    }
  }

  // Append the table to the property list
  propertyList.appendChild(table);
}

function showMessage(message1) {
  const popDiv = document.querySelector("#errorPopup");
  popDiv.style.display = 'block';
  const countElement = document.querySelector("#message");
  countElement.textContent = message1;
}

document.addEventListener("DOMContentLoaded", function() {
  const closePopup = document.getElementById("closePopup");
  closePopup.addEventListener("click", function() {
    const errorPopup = document.getElementById("errorPopup");
    errorPopup.style.display = "none";
  });

  // Load page logic
  loadPage();
});

function loadPage() {
  // Load logic here
  console.log("Page loaded successfully.");
}
