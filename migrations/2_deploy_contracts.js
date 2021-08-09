const OnePay = artifacts.require("OnePay");

module.exports = function(deployer) {
    deployer.deploy(OnePay);
};
