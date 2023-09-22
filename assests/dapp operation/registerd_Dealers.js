// Initialize your contract object here
// For example: const nft_contract = ...;
const showResultsBtn = document.getElementById("showResultsBtn");
// Display the results in an HTML table
async function showResults() {
  try {
    const result = await nft_contract.methods.checkRegisterddealers().call();
    showTable(result);
    console.log(result);
  } 
  catch(error) {
    console.log("Error processing results:", error);
    showMessage("Transaction failed: " + error);
  }
}
////////
function showTable(result) {
  const table = document.getElementById("dealersTable");
  result.forEach((dealer) => {
    const row = table.insertRow();
    row.insertCell().textContent = dealer.frunchiseNo;
    row.insertCell().textContent = dealer.frunchiseLocation;
    row.insertCell().textContent = dealer.dealerEthereuem_address;
    // Add more cells and properties as needed
  });
  showResultsBtn.style.display = 'none';
}


/////////////
function showMessage(message1) {
  const popDiv = document.querySelector("#errorPopup");
  popDiv.style.display = 'block';
  const countElement = document.querySelector("#message");
  countElement.textContent = message1;
  showResultsBtn.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
  showResultsBtn.addEventListener("click", showResults);

  const closePopup = document.getElementById("closePopup");
  closePopup.addEventListener("click", function() {
    const errorPopup = document.getElementById("errorPopup");
    errorPopup.style.display = "none";
    showResultsBtn.style.display = 'block';
  });
 
  // Load page logic
  loadPage();
});

function loadPage() {
  // Load logic here
  console.log("Page loaded successfully.");
}
