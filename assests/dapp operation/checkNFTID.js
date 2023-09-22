// Function to check the plots sold by the dealer
async function checkPlotsSold() {
  // countElement.textContent = "";
  const registryNo = document.querySelector("#registryNo").value;
  
  try {
    const result = await nft_contract.methods.check_NFTID(registryNo).call();
    displayResult(result);
    console.log(result);
    showMessage(""); // Clear any previous error message
  } catch (error) {
    console.log("Error calling contract function:", error);
    showMessage("Transaction failed: " + error.message); // Display the error message in the message box
  }
}
const countElement = document.getElementById("nftid");
const dis = document.querySelector("#dis");
// Function to display the count of plots sold by the dealer
function displayResult(count) {
  
  countElement.textContent = count;
dis.style.display = "none";
}

// Function to show a message in the message box
function showMessage(message) {
  // countElement.textContent = "";
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
 
}

// Add event listener to the button
const checkButton = document.querySelector("#submit");
checkButton.addEventListener("click", checkPlotsSold);
function loadPage() {
  // Load logic here
  console.log("Page loaded successfully.");
}