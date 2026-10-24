// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/governance/TimelockController.sol";

/**
 * @title Timelock
 * @dev Timelock controller for BEAST System 3.0 DAO governance executions.
 */
contract Timelock is TimelockController {
    /**
     * @brief Initializes the timelock with a minimum delay, designated proposers, executors, and admin.
     * @param minDelay Minimum delay in seconds before a queued operation can be executed.
     * @param proposers Array of addresses granted proposer roles (typically the Governor contract).
     * @param executors Array of addresses granted executor roles (can be address(0) for anyone or specific addresses).
     * @param admin Address to grant initial admin role (can be transferred to the timelock itself later).
     */
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDelay, proposers, executors, admin) {}
}
