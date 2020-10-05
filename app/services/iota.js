'use strict';
// IOTA global 
const Iota = require('@iota/core');
const Extract = require('@iota/extract-json');
const Converter = require('@iota/converter');
const Mam = require('@iota/mam');
const PoEx = require ('@iota/poex-tool');


// Connect to a node
const iota = Iota.composeAPI({
  provider: 'http://localhost:14265'
});


class iotaService {

    constructor(address='',seed='') {
        this.depth = 3;
        this.minimumWeightMagnitude = 9;
        this.address = (address === '')?'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D':address;
        this.seed = s (seed === '')?'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX':seed;
    }

    
    /* IOTA */
    async pushDataIOTA(dataCategory,filtredDataset) {
        const message = JSON.stringify({dataCategory:dataCategory, dataset:filtredDataset});
        // Convert the message to trytes
        const messageInTrytes = Converter.asciiToTrytes(message);
        // Define a zero-value transaction object
        // that sends the message to the address
        const transfers = [
            {
              value: 0,
              address: address,
              message: messageInTrytes
            }
          ];
        // Create a bundle from the `transfers` array
        // and send the transaction to the node
        const trytes = await iota.prepareTransfers(seed, transfers);   
        const bundle =  await iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
        return bundle[0].hash;      
    }
    
    async fetchIOTA(tailTransactionHash){
        // Get the transaction objects in the bundle
        const bundle = await iota.getBundle(tailTransactionHash)
        // Extract and parse the JSON messages from the transactions' `signatureMessageFragment` fields
        const data = JSON.parse(Extract.extractJson(bundle));
        return data;
    }


    /*MAM */
    async initMAM(sideKey='',provider='',providerName=''){
        this.mode = 'restricted';
        this.sideKey = (sideKey ==='')?'VERYSECRETKEY':sideKey;
        this.provider = (provider ==='')?'http://localhost:14265':provider;
        this.providerName = (providerName ==='')?'localhost':providerName;
        this.mamExplorerLink = 'https://utils.iota.org/mam';
        this.mamState = Mam.init(this.provider);
        this.mamState = Mam.changeMode(this.mamState, this.mode, this.sideKey);
    }
    async pushDataMAM(data) {
        // Create MAM message as a string of trytes
        const trytes = Converter.asciiToTrytes(JSON.stringify(data));
        const message = Mam.create(this.mamState, trytes);
        // Save your new mamState
        this.mamState = message.state;
        // Attach the message to the Tangle     
        await Mam.attach(message.payload, message.address, this.depth, this.minimumWeightMagnitude);
        console.log('Published', data, '\n');
        return message.root; 
    }

    async fetchMAM(root){
        const resp = await  Mam.fetch(root, this.mode, this.sideKey)
        const tryteMessages = resp.messages
        const asciiMessages = []
        for (let index = 0; index < tryteMessages.length; index++) {
            asciiMessages.push(Converter.trytesToAscii(tryteMessages[index]))
        }
         return asciiMessages
    }

}

module.exports = {
    iota:iotaService
}
