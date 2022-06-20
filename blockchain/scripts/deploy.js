const fs = require('fs');
const { ethers } = require('hardhat');

async function main() {

    const BankContract = await ethers.getContractFactory("Bank");
    const bank = await BankContract.deploy();
    await bank.deployed();
    console.log("The Bank Contract was deployed to: " + bank.address);

    const TokenContract = await ethers.getContractFactory("Token");
    const token = await TokenContract.deploy(bank.address);
    await token.deployed();
    console.log("The token contract wass deployed to: " + token.address);

    //Create the environment file with the start contract addresses.
    let addresses = {
        "bankcontract": bank.address, 
        "tokencontract": token.address};
    let addressesJSON = JSON.stringify(addresses);
    fs.writeFileSync("environment/contract-address.json", addressesJSON);
}

main()
.then(() => {
    process.exit(0);
})
.catch((error) => {
    console.error(error);
    process.exit(1);
})