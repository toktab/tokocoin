// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokoCoin is ERC20 {
    address public fundingWallet;

    constructor(address _fundingWallet) ERC20("TokoCoin", "TOKO") {
        fundingWallet = _fundingWallet;
        _mint(fundingWallet, 100 * 10**decimals());
    }
}
