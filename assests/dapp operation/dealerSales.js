// Function to check the plots sold by the dealer
async function checkPlotsSold() {
  countElement.textContent = "";
  const franchiseNo = document.getElementById("franchiseNo").value;
  
  try {
    const result = await nft_contract.methods.check_how_many_plot_sell_by_dealer(franchiseNo).call();
    displayPlotsSoldCount(result);
    showMessage(""); // Clear any previous error message
  } catch (error) {
    console.error("Error calling contract function:", error);
    showMessage("Transaction failed: " + error.message); // Display the error message in the message box
  }
}
const countElement = document.getElementById("plotsSoldCount");
// Function to display the count of plots sold by the dealer
function displayPlotsSoldCount(count) {
  
  countElement.textContent = count;
}

// Function to show a message in the message box
function showMessage(message) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
}

// Add event listener to the button
const checkButton = document.querySelector(".button");
checkButton.addEventListener("click", checkPlotsSold);
