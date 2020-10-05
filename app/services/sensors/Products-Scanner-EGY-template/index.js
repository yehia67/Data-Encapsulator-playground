const fetch = require('node-fetch');
const { publish } = require('./iota');
const { debug, serverUrl } = require('./config.json');


// EXAMPLE 2: request data from server or sensor
const queryData = async delay => {
  while (true) {
    // Access public server. URL is configurable in config.json
    // In this example a Star Wars API is used for demo purposes
    const response = await fetch(serverUrl); // construct URL to request a random star wars vehicle
    const status = response.status;
    const json = await response.json();

    // Continuously check the response status until it's completed, failed or times out.
    if (status === 418) { // specify your HTTP status codes here
      break;
    } else if (status === 200) {
      const payload = json;

      if (debug) {
        console.log(payload);
      } else {
        // Publish sensor data to marketplace
        await publish(payload); // your sensor data goes here. Payload is any content in JSON format
      }

      // Delay before running the next loop iteration:
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

queryData(60000) // query data every 60 seconds
