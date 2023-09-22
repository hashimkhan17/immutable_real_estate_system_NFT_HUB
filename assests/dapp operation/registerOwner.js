const displayMessage = document.querySelector('#message');
const btn = document.querySelector("#submit");
async function insertowner()
{  
     let owner_name = document.querySelector("#ownerName").value;
let ownercnic = document.querySelector('#ownerCnic').value;
let owneraddress = document.querySelector("#ownerAddress").value;
let owner_EtherumAddress = document.querySelector("#ownerEthereumAddress").value;
    try{
        const result = await nft_contract.methods.enterOwnerDetails(owner_name,ownercnic,owneraddress,owner_EtherumAddress).send({from: myaccount[0]});
        showMessage(result);
    }
catch(error)
{
   showerror(error);
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

btn.addEventListener('click', insertowner);
// string memory _ownerName,
// uint _ownerCnic,
// string memory _owneraddress,
// address _ownerEthereumAddress
function loadPage() {
    // Load logic here
    console.log("Page loaded successfully.");
  }