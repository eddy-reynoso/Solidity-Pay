pragma solidity ^0.5.0;

contract FavoriteNumber {

    mapping (address=>uint) public favoriteNumberOf;

    constructor() public{
        favoriteNumberOf[msg.sender] = 0;
    }

    function getFavoriteNumber() public returns (uint256){
        return favoriteNumberOf[msg.sender];
    }

    function setFavoriteNumber(uint256 _newFavoriteNumber) public returns (bool){
        favoriteNumberOf[msg.sender] = _newFavoriteNumber;
        return true;
    }
}