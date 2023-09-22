let smartContractAddress = "0xf07c5feeEADFB61973748cc784801d71656d46cd";

// Contract objects
let nft_contract = null;

const getContract = async (web3) => {
  const response = await fetch('/realEstateNft.json');
  const realEstateData = await response.json();

  nft_contract = new web3.eth.Contract(realEstateData.abi, smartContractAddress);

  console.log("Loaded real estate Contract Object: ", nft_contract);

  return nft_contract;
};

async function initSetup() {
  web3 = await getWeb3();

  await getContract(web3);

  try {
    loadPage();
  } catch (error) {
    console.log("Load page is not defined by child page:", error);
  }
}

initSetup();
