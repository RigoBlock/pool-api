// Copyright 2017 Rigo Investment Sagl.
// This file is part of RigoBlock.

import * as abis from '../../contracts/abi'
import Registry from '../registry'

class TokenWrapperWeb3 {
  constructor(api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    this._api = api
    this._abi = abis.rigotoken
    this._registry = new Registry(api)
    this._constunctorName = this.constructor.name
  }

  get instance() {
    if (typeof this._instance === 'undefined') {
      throw new Error('The contract needs to be initialized.')
    }
    return this._instance
  }

  init = address => {
    const api = this._api
    const abi = this._abi
    this._instance = new api.eth.Contract(abi)
    return this._instance
  }

  balanceOf = accountAddress => {
    if (!accountAddress) {
      throw new Error('accountAddress needs to be provided')
    }
    const instance = this._instance
    return instance.methods.balanceOf(accountAddress).call({})
  }

  depositLock = accountAddress => {
    if (!accountAddress) {
      throw new Error('accountAddress needs to be provided')
    }
    const instance = this._instance
    return instance.methods.depositLock(accountAddress).call({})
  }

  transfer = (fromAddress, toAddress, amount) => {
    if (!toAddress) {
      throw new Error('toAddress needs to be provided')
    }
    if (!amount) {
      throw new Error('amount needs to be provided')
    }
    const instance = this._instance
    const options = {
      from: fromAddress
    }

    return instance.methods
      .transfer(toAddress, amount)
      .estimateGas(options)
      .then(gasEstimate => {
        console.log(gasEstimate)
        options.gas = gasEstimate
      })
      .then(() => {
        return instance.methods.transfer(toAddress, amount).send(options)
      })
  }
}

export default TokenWrapperWeb3
