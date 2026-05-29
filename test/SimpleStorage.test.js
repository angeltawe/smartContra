const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("SimpleStorage Security", function () {
let contract, owner, attacker;
beforeEach(async () => {
[owner, attacker] = await ethers.getSigners();
const Factory = await ethers.getContractFactory("SimpleStorage");
contract = await Factory.deploy();
});
it("allows owner to set value", async () => {
await contract.setValue(100);
expect(await contract.getValue()).to.equal(100);
});
it("prevents non-owner from setting value", async () => {
await expect(
contract.connect(attacker).setValue(999)
).to.be.revertedWith("Not authorised");
});
it("emits ValueUpdated event on change", async () => {
await expect(contract.setValue(42))
.to.emit(contract, "ValueUpdated")
.withArgs(owner.address, 42);
});
});