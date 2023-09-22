
// Function to check if owner data exists
async function checkNFTExist() {
  var registryNo = document.querySelector("#registryNoInput").value;
  console.log(registryNo);
  try {
    const result = await nft_contract.methods.checkAlreadyNftcreated(registryNo).call();
    displayExistence(result);
  } catch (error) {
    console.error("Error calling contract function:", error);
    displayExistence1(error);
  }
}

// Function to display the message based on the owner data existence
function displayExistence(result) {

  if (result) {
    messageElement.textContent = "Yes, this Property nft already exists.";
  } else {
    messageElement.textContent = "No, this Property nft  does not exist.";
  }
}
function displayExistence1(error)
{
 
  messageElement.textContent = error;

}
const messageElement = document.getElementById("message");
messageElement.style.fontSize ="18px";
// Example usage // Enter the owner's Ethereum address here
const submit_btn = document.querySelector('#submit');
submit_btn.addEventListener("click",checkNFTExist);

function loadPage() {
  // Load logic here
  console.log("Page loaded successfully.");
}