# Web3: Decentralized Bank

Crea un proyecto Angular
---
```
ng new <name project>
```
Instala las dependencias
---
```
yarn add hardhat @nomiclabs/hardhat-etherscan @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers dotenv standard sass -D
```
Empieza un proyecto hardhat
---
```
npx hardhat 
```
en `What do you want to do?` selecciona `Create an empty hardhat.config.js`

Adiciona estas configuraciones en el archivo tsconfig.json
---

```
compilerOptions {
    ...
    "resolveJsonModule": true, 
    "esModuleInterop": true,
    "strictPropertyInitialization": false
}

```

Trae el contrato ERC-20 
---

```
npm install @openzeppelin/contracts @chainlink/contracts
```

Y configura el archivo hardhat.config.js
---

````
require("@nomiclabs/hardhat-waffle");
const secrets = require("./environment/secrets.json");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  paths: { //se enrutan las fuentes del blockchain
    sources: "./blockchain/contracts",
    tests: "./blockchain/test",
    cache: "./blockchain/cache",
    artifacts: "./blockchain/artifacts"
  },
  defaultNetwork: "kovan",
    networks: {
      hardhat: {
        // If want to do some forking, uncomment this
        // forking: {
        //  url: MAINNET_RPC_URL
        // }
      },
      localhost: {
      },
      kovan: {
        url: secrets.KOVAN_RPC_URL,
        accounts: [secrets.PRIVATE_KEY],
        saveDeployments: true,
      }
    },
  solidity: "0.8.15",
  
};
````
