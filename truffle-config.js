require("dotenv").config();
require("babel-register");
require("babel-polyfill");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const projectId = process.env.PROJECT_ID;
const mnemonic = process.env.NEUMONIC;
//
module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "5777", // Match any network id
        },
        ropsten: {
            provider: () =>
                new HDWalletProvider(
                    mnemonic,
                    `https://ropsten.infura.io/v3/${projectId}`
                ),
            network_id: 3, // Ropsten's id
            gas: 5500000, // Ropsten has a lower block limit than mainnet
            confirmations: 2, // # of confs to wait between deployments. (default: 0)
            timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
            skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
        },
    },
    contracts_directory: "./src/contracts/",
    contracts_build_directory: "./src/abis/",
    compilers: {
        solc: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
            evmVersion: "petersburg",
        },
    },
};
