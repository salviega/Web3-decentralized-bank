const {expect} = require("chai");
const { ethers } = require("hardhat");

describe("Bank App", () => {
    let bank, token, owner, address_1, address_2;
    let addresses;

    beforeEach(async () => {
        const BankContract = await ethers.getContractFactory("Bank");
        bank = await BankContract.deploy();
        await bank.deployed();

        const TokenContract = await ethers.getContractFactory("Token");
        token = await TokenContract.deploy(bank.address);
        await token.deployed();

        [owner, address_1, address_2, ...addresses] = await ethers.getSigners();
    });

    describe("Deployment", () => {
        it("Should have totalAssertsof 0", async () => {
            expect(await bank.totalAsserts()).to.equal("0");
        });
        
        it("Should have 0 tokens, and 0 deposit in owner account", async () => {
            expect(await bank.accounts(owner.address)).to.equal("0");
            expect(await token.balanceOf(owner.address)).to.equal("0");
        });

        it("Should have 0 tokens, and 0 deposit in address_1 account", async () => {
            expect(await bank.accounts(address_1.address)).to.equal("0");
            expect(await token.balanceOf(address_1.address)).to.equal("0");
        });

        it("Should have 0 tokens, and 0 deposit in address_2 account", async () => {
            expect(await bank.accounts(address_2.address)).to.equal("0");
            expect(await token.balanceOf(address_2.address)).to.equal("0");
        });

    });
})
