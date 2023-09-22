       // Replace with the token ID you want to transfer
       const displayMessage = document.querySelector('#message');
       
// Call the transferFrom function
async function transferToken() {
    const fromAddress = document.querySelector("#from").value;
    const toAddress = document.querySelector("#to").value;
    const tokenId = document.querySelector("#tokenId").value;
  try {
    const result = await nft_contract.methods.transferFrom(fromAddress, toAddress, tokenId).send({ from: myaccount[0] });
    console.log("Transfer successful:", result);
    showMessage(result);
    // Handle success, update UI or display a message
  } catch (error) {
    console.log("Error transferring token:", error);
    showMessage(error);
    // Handle error, show error message, etc.
  }

}
function showMessage(result)
{
    displayMessage.textContent = "Transaction successful! Transaction hash: " + result.transactionHash;

}
function showerror(errorr)
{
    displayMessage.textContent = errorr;
}
// Call the transferToken function when needed, e.g., on a button click
const transferButton = document.querySelector("#submit");
transferButton.addEventListener("click", transferToken);
function loadPage() {
    // Load logic here
    console.log("Page loaded successfully.");
  }