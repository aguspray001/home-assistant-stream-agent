const PrivateKeyProvider = require("@truffle/hdwallet-provider");
const privateKeys = [
  "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63"
];
const privateKeyProvider = new PrivateKeyProvider(privateKeys,  "http://10.0.2.15:8545");


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 0
    },
    besu: {
      provider: privateKeyProvider,
      network_id: "*",
    },
  },
  compilers: {
    solc: {
      version: "0.8",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};
