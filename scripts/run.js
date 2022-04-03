

const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners(); 
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal"); 
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    }); 
    await waveContract.deployed(); 

    console.log("Contract deployed to: ", waveContract.address); 
    console.log("Contract deployed by: ", owner.address); 

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address); 
    console.log("Balance: ", hre.ethers.utils.formatEther(contractBalance)); 

    let wavecount; 
    wavecount = await waveContract.getTotalWaves(); 
    console.log(wavecount.toNumber()); 

    let waveTxn = await waveContract.wave("Trying"); 
    await waveTxn.wait(); 

    

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address); 
    console.log("Balance: ", hre.ethers.utils.formatEther(contractBalance)); 

    let allWaves = await waveContract.getAllWaves(); 
    console.log(allWaves); 

}; 

const runMain = async () => {
    try {
        await main(); 
        process.exit(0); 
    } catch (err) {
        console.log(err); 
        process.exit(1); 
    }
}; 

runMain(); 