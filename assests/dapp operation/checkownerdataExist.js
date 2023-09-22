
// Function to check if owner data exists
async function checkOwnerDataExist() {
  var ethereum_address = document.querySelector("#eth_address").value;
  try {
    const result = await nft_contract.methods.checkOwnerDataExist(ethereum_address).call();
    displayOwnerDataExistence(result);
  } catch (error) {
    console.error("Error calling contract function:", error);
    displayOwnerDataExistence1(error);
  }
}

// Function to display the message based on the owner data existence
function displayOwnerDataExistence(result) {

  if (result) {
    messageElement.textContent = "Yes, this person's data already exists.";
  } else {
    messageElement.textContent = "No, this person's data does not exist.";
  }
}
function displayOwnerDataExistence1(error)
{
 
  messageElement.textContent = error;

}
const messageElement = document.getElementById("message");
messageElement.style.fontSize ="18px";
// Example usage // Enter the owner's Ethereum address here
const submit_btn = document.querySelector('#submit');
submit_btn.addEventListener("click",checkOwnerDataExist);

function loadPage() {
  // Load logic here
  console.log("Page loaded successfully.");
}