  async function getOwnerProfile() {
    const eTokenId = document.querySelector("#eTokenId").value;
    try {
      const result = await nft_contract.methods.ownerOfToken(eTokenId).call();
        console.log(result);
        showTable(result);
    } catch (error) {
        console.log(error);
        showMessage(error);
    }
}

async function getOwnerProfile1() {
  const eRegistry = document.querySelector("#eRegistry").value;
  try {
    const result = await nft_contract.methods.ownerOF_Registry(eRegistry).call();
      console.log(result);
      showTable(result);
  } catch (error) {
      console.log(error);
      showMessage(error);
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
    
  }
  function showTable(owner) {
    // Use Object.entries() to convert the object to an array of key-value pairs
    
      const table = document.querySelector("#ownerTable");
     
        const row = table.insertRow();
        row.insertCell().textContent = owner.ownerName;   // Access property value using owner[1]
        row.insertCell().textContent = owner.ownerCnic;
        row.insertCell().textContent = owner.owneraddress;
        row.insertCell().textContent = owner.ownerEthereumAddress;
      
    }
  
   const btn1 = document.querySelector(".submit1");
 btn1.addEventListener("click",getOwnerProfile1);
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
    btn1.addEventListener("click",getOwnerProfile1);
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