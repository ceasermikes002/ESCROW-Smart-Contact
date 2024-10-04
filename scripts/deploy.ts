import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    const payer = "0x2528b985765da6aeBDE7c6d823915c1CC336b057"; // Replace with actual payer address
    const payee = "0x80fcF3D05574D1Aeba894A35FD5b3827EF28D0D7"; // Replace with actual payee address
    const amount = ethers.parseEther("0.01"); // .01 Ether in this case

    console.log("Deploying contract with the account:", deployer.address);

    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(payer, payee, amount);

    await escrow.waitForDeployment();

    console.log("Escrow contract deployed at:", escrow.target);
}

// Run the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
