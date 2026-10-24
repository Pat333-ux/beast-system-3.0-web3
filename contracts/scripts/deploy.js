const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // 1. Deploy LUCRToken with deployer as initial admin
  console.log("Deploying LUCRToken...");
  const LUCRToken = await hre.ethers.getContractFactory("LUCRToken");
  const lucrToken = await LUCRToken.deploy(deployer.address);
  await lucrToken.waitForDeployment();
  const lucrTokenAddress = await lucrToken.getAddress();
  console.log(`LUCRToken deployed to: ${lucrTokenAddress}`);

  // 2. Deploy Timelock Controller (1 day min delay = 86400 seconds)
  // Initially, deployer acts as proposer/executor/admin for setup, transferred to Governor later.
  console.log("Deploying TimelockController...");
  const minDelay = 86400; // 1 day
  const Timelock = await hre.ethers.getContractFactory("Timelock");
  const timelock = await Timelock.deploy(
    minDelay,
    [deployer.address], // proposers
    [deployer.address], // executors
    deployer.address    // admin
  );
  await timelock.waitForDeployment();
  const timelockAddress = await timelock.getAddress();
  console.log(`Timelock deployed to: ${timelockAddress}`);

  // 3. Deploy LucricityGovernor linked to token and timelock
  console.log("Deploying LucricityGovernor...");
  const LucricityGovernor = await hre.ethers.getContractFactory("LucricityGovernor");
  const governor = await LucricityGovernor.deploy(lucrTokenAddress, timelockAddress);
  await governor.waitForDeployment();
  const governorAddress = await governor.getAddress();
  console.log(`LucricityGovernor deployed to: ${governorAddress}`);

  // 4. Setup Roles on Timelock (Grant PROPOSER to Governor, revoke from deployer optionally)
  const PROPOSER_ROLE = await timelock.PROPOSER_ROLE();
  const EXECUTOR_ROLE = await timelock.EXECUTOR_ROLE();
  const TIMELOCK_ADMIN_ROLE = await timelock.TIMELOCK_ADMIN_ROLE();

  console.log("Configuring Timelock roles...");
  await timelock.grantRole(PROPOSER_ROLE, governorAddress);
  // Allow anyone to execute queued proposals
  await timelock.grantRole(EXECUTOR_ROLE, hre.ethers.ZeroAddress);
  
  // Optional: Renounce deployer admin role if ready, leaving timelock self-administered
  // await timelock.revokeRole(TIMELOCK_ADMIN_ROLE, deployer.address);

  console.log("Deployment and configuration completed successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
