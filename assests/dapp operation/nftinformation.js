async function ShowResult()
{
const idd = document.querySelector("#eTokenId").value;
try {
const result = await nft_contract.methods.propertyNftStoreValue(idd).call();
displayResult(result);
console.log(result);
}
catch(error)
{
console.log(error);
showMessage(error);
}
}

function displayResult(owner) {
 
  const center1 = document.querySelector('.center1');
  center1.style.display = "block";

    const table = document.querySelector("#NFTTable");
   table.style.width = '100%';
      const row = table.insertRow();
      row.insertCell().textContent = owner.housingsociety;   // Access property value using owner[1]
      row.insertCell().textContent = owner.phase;
      row.insertCell().textContent = owner.streetNo;
      row.insertCell().textContent = owner.plotNo;
      row.insertCell().textContent = owner.registryNo;   // Access property value using owner[1]
      row.insertCell().textContent = owner.plotarea;
      row.insertCell().textContent = owner.landLocation;
      row.insertCell().textContent = owner.landnature;

  }

  
  const btn = document.querySelector("#submit");
  btn.addEventListener("click",ShowResult);

  function showMessage(message1) {
    const popDiv = document.querySelector("#errorPopup");
    popDiv.style.display = 'block';
    const countElement = document.querySelector("#message");
    countElement.textContent = message1;

  }
  
  document.addEventListener("DOMContentLoaded", function() {
    btn.addEventListener("click",ShowResult);
  
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