const { ethers } = require('hardhat');

async function main() {
  const MyContract = await ethers.getContractFactory('realEstateNft');
  const contract = await MyContract.deploy();

  console.log('Contract deployed to:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
