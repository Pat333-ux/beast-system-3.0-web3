const { ethers } = require("ethers");

class Web3Service {
    constructor() {
        this.provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
        this.wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, this.provider);

        this.lucrTokenAddress = process.env.LUCR_TOKEN_ADDRESS;
        this.governorAddress = process.env.GOVERNOR_ADDRESS;

        this.tokenAbi = [
            "function mint(address to, uint256 amount) external",
            "function balanceOf(address account) view returns (uint256)",
            "function delegate(address delegatee) external",
            "function getVotes(address account) view returns (uint256)"
        ];
    }

    async getBalance(accountAddress) {
        try {
            const tokenContract = new ethers.Contract(this.lucrTokenAddress, this.tokenAbi, this.provider);
            const balance = await tokenContract.balanceOf(accountAddress);
            return ethers.formatUnits(balance, 18);
        } catch (error) {
            console.error("Error fetching balance:", error);
            throw error;
        }
    }

    async mintTokens(recipientAddress, amountInTokens) {
        try {
            const tokenContract = new ethers.Contract(this.lucrTokenAddress, this.tokenAbi, this.wallet);
            const parsedAmount = ethers.parseUnits(amountInTokens.toString(), 18);

            const tx = await tokenContract.mint(recipientAddress, parsedAmount);
            const receipt = await tx.wait();
            return { success: true, txHash: receipt.hash };
        } catch (error) {
            console.error("Error minting tokens:", error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = new Web3Service();
