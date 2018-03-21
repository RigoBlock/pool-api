# PoolApi

### A js wrapper around RigoBlock Smart Contracts to simplify their consumption.

## Usage

### Example


Import PoolApi class and create an instance passing a Parity API/Web3 instance.

Getting drago details from DragoRegistry contract:
```javascript
import PoolApi from '../../PoolApi/src'

const PoolApi = new PoolApi(api)
PoolApi.contract.dragoregistry
  .init()
  .then(() =>{
    PoolApi.contract.dragoregistry
    .drago(dragoID)
    .then((dragoDetails) => {
      console.log(dragoDetails)
    })
  })
  ```

Getting drago prices from DragoEVO contract:
```javascript
//
// Initializing Drago API
// Passing Parity API
//
const PoolApi = new PoolApi(api)
//
// Initializing registry contract
//
PoolApi.contract.dragoregistry
  .init()
  .then((address) =>{
    //
    // Looking for drago from dragoID
    //
    PoolApi.contract.dragoregistry
    .drago(dragoID)
    .then((dragoDetails) => {
      const dragoAddress = dragoDetails[0][0]
      //
      // Initializing drago contract
      //
      PoolApi.contract.drago.instance(dragoAddress)
      //
      // Calling getData method
      //
      PoolApi.contract.drago.getData()
      .then((data) =>{
        this.setState({
          dragoDetails: {
            address: dragoDetails[0][0],
            name: dragoDetails[0][1],
            symbol: dragoDetails[0][2],
            dragoID: dragoDetails[0][3].c[0],
            addresssOwner: dragoDetails[0][4],
            addressGroup: dragoDetails[0][5],
            sellPrice: api.util.fromWei(data[2].toNumber(4)).toFormat(4),
            buyPrice: api.util.fromWei(data[3].toNumber(4)).toFormat(4),
          },
          loading: false
        })
      })
```
## Supported contracts

### DragoFactory

`createDrago(dragoName, dragoSymbol, accountAddress)`

### DragoRegistry

Methods:

`drago(dragoID)` returns `address drago, string name, string symbol, uint dragoID, address owner, address group`
`fromAddress(dragoAddress)` returns `uint id, string name, string symbol, uint dragoID, address owner, address group`

### DragoEVO

Methods:

`buyDrago`
`depositToExchange(exchangeAddress, tokenAddress, amount)`
`getData()` returns `string name, string symbol, uint sellPrice, uint buyPrice`
`placeOrderCFDExchange(accountAddress, exchangeAddress, cfd, is_stable, adjustment, stake)`
`sellDrago`
`setPrices(accountAddress, buyPrice, sellPrice)`

### Ethusd

### Eventful

`getAllLogs(topics)` returns events array

### Exchange

`balanceOf(tokenAddress, accountAddress)`

