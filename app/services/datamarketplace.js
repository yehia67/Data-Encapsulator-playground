const fetch = require('node-fetch');
const { async } = require('regenerator-runtime');

const {userIdMarketplace,apiKeyMarketplace} = require('../../config');
const { Data } = require('../../models');
const url = 'https://api.marketplace.tangle.works';



// dummy data for testing purpose
const deviceInputData = [
  { id: 'name', name: 'Vehicle Name', unit: 'name' },
  { id: 'model', name: 'Vehicle Model', unit: 'model' },
  { id: 'class', name: 'Vehicle Class', unit: 'class' },
  { id: 'manufacturer', name: 'Vehicle Manufacturer', unit: 'manufacturer' }
];
const location = {
  city: 'Cario',
  country: 'Egypts'
};
const latutude = 30;
const longitude = 26;
const createNewDevice = async (deviceName,deviceInputData) => {
  const response = await fetch(url+'/newDevice',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: apiKeyMarketplace,
        id: deviceName,
        device: {
          owner: userIdMarketplace, 
          sensorId: deviceName,
          type: deviceName,
          company: 'IOTA Data Encapsulator',
          price: '0',
          date: '14 February, 2019 11:16 am',
          inactive: true,
          dataTypes:deviceInputData,
          location:location,
          lat: latutude,
          lon: longitude
        }
      })
    });
  try{
  const json = await response;
  return json;
  }catch(e){
    console.error(e);
  }
}
const test = async()=>{
  const createNewDeviceTest = await createNewDevice('test-app',deviceInputData);
  console.log(createNewDeviceTest);
};

test();