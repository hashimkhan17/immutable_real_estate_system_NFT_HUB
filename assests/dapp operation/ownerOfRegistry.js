const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = [
  // Add your contract ABI here
];

// Create a new instance of the web3 provider
const web3 = new Web3(window.ethereum);

// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to get the owner information for a given registry number
async function getOwnerByRegistry(regno) {
  try {
    const result = await contract.methods.ownerOF_Registry(regno).call();
    return result;
  } catch (error) {
    console.error("Error calling contract function:", error);
    throw error;
  }
}

// Function to display the owner information on the page
function displayOwnerInfo(ownerInfo) {
  const ownerInfoContainer = document.getElementById("ownerInfoContainer");
  const ownerInfoElement = document.getElementById("ownerInfo");
  ownerInfoElement.textContent = ownerInfo;
  ownerInfoContainer.style.display = "block";
}

// Function to handle the button click and retrieve the owner information
function getOwnerInfo() {
  const registryNumberInput = document.getElementById("registryNumber");
  const registryNumber = parseInt(registryNumberInput.value);
  
  getOwnerByRegistry(registryNumber)
    .then((ownerInfo) => displayOwnerInfo(ownerInfo))
    .catch((error) => console.error(error));
}
