// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./TokoCoin.sol";

contract TokoFaucet {
    TokoCoin public token;
    address public owner;
    uint256 public rewardPerPoint = 1 ether;

    mapping(address => mapping(uint256 => bool)) public claimedArticle;

    event RewardClaimed(address indexed user, uint8 score, uint256 indexed articleId, uint256 reward);

    constructor(address _token) {
        token = TokoCoin(_token);
        owner = msg.sender;
    }

    function claimReward(uint8 score, uint256 articleId) external {
        require(score > 0 && score <= 5, "Invalid score");
        require(!claimedArticle[msg.sender][articleId], "Already claimed this article");

        claimedArticle[msg.sender][articleId] = true;

        uint256 amount = uint256(score) * rewardPerPoint;
        require(token.balanceOf(address(this)) >= amount, "Faucet depleted");
        require(token.transfer(msg.sender, amount), "Transfer failed");

        emit RewardClaimed(msg.sender, score, articleId, amount);
    }

    function faucetBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function setRewardPerPoint(uint256 _rewardPerPoint) external {
        require(msg.sender == owner, "Only owner");
        rewardPerPoint = _rewardPerPoint;
    }
}
