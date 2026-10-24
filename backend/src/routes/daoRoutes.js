const express = require("express");
const router = express.Router();
const web3Service = require("../services/web3Service");

/**
 * @route GET /api/dao/balance/:address
 * @desc Get LUCR token balance for an account
 */
router.get("/balance/:address", async (req, res) => {
    try {
        const { address } = req.params;
        const balance = await web3Service.getBalance(address);
        res.status(200).json({ success: true, address, balance });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * @route POST /api/dao/mint
 * @desc Mint LUCR tokens (Requires MINTER_ROLE on backend wallet)
 */
router.post("/mint", async (req, res) => {
    try {
        const { recipient, amount } = req.body;
        if (!recipient || !amount) {
            return res.status(400).json({ success: false, error: "Recipient and amount are required" });
        }

        const result = await web3Service.mintTokens(recipient, amount);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
