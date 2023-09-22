async function getOwnerProfile() {
    try {
        const result = await nft_contract.methods.getOwnerProfile().call({ from: myaccount[0]});
        console.log(result);
        showTable(result);
    } catch (error) {
        console.log(error);
        showMessage(error)
    }
}
  ////
  function showTable(owner) {
  // Use Object.entries() to convert the object to an array of key-value pairs
  
    const table = document.querySelector("#ownerTable");
   
      const row = table.insertRow();
      row.insertCell().textContent = owner.ownerName;   // Access property value using owner[1]
      row.insertCell().textContent = owner.ownerCnic;
      row.insertCell().textContent = owner.owneraddress;
      row.insertCell().textContent = owner.ownerEthereumAddress;
    
    
    btn.style.display = 'none';
  }
  
  

const btn = document.querySelector("#submit");
btn.addEventListener("click",getOwnerProfile);


function showMessage(message1) {
    const popDiv = document.querySelector("#errorPopup");
    popDiv.style.display = 'block';
    const countElement = document.querySelector("#message");
    countElement.textContent = message1;
    showResultsBtn.style.display = 'none';
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    btn.addEventListener("click",getOwnerProfile);
  
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