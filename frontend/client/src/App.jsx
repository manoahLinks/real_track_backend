import {ApolloClient, InMemoryCache, gql} from "@apollo/client";
import { useState, useEffect } from 'react';

function App() {

  const [temperature, setTemperature] = useState([]);

  const queryUrl = "https://api.studio.thegraph.com/query/57950/iot/version/latest";

  const client = new ApolloClient({
    uri: queryUrl,
    cache: new InMemoryCache()
  });

  const getTemperature = gql`
  {
    updates(first: 5) {
      id
      sensor
      temperature
      blockNumber
    }
  }
  `;

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const {data} = await client.query({query: getTemperature});

        setTemperature(data.updates);
        // console.log(data.updates)

      } catch (error) {
        console.log("unable to fetch data",error)
      }
    } 

    fetchTemperature();

    return() => {}

  }, [client, getTemperature]);

  //========== ZK pass integration ===========

  // =========================================

  const verify = async () => {
    try {
      // The appid of the project created in dev center
      const appid = "8fb9d43c-2f24-424e-a98d-7ba34a5532f5"
  
      // Create the connector instance
      const connector = new TransgateConnect(appid)
  
      // Check if the TransGate extension is installed
      // If it returns false, please prompt to install it from chrome web store
      const isAvailable = await connector.isTransgateAvailable()
  
      if (isAvailable) {
        // The schema id of the project
        const schemaId = "516a720e-29a4-4307-ae7b-5aec286e446e"
  
        // Launch the process of verification
        // This method can be invoked in a loop when dealing with multiple schemas
        const res = await connector.launch(schemaId)
  
        // verifiy the res onchain/offchain based on the requirement     
        
      } else {
        console.log('Please install TransGate')
      }
    } catch (error) {
      console.log('transgate error', error)
    }
  }

  return (
    <>
     {temperature !== null && temperature.length > 0 && temperature.map((temp, index)=> (
          <div key={temp.id}>
            <h4>{index}</h4>
            <h4>Temperature: {temp.temperature}</h4>
          </div>
        ))}
    </>
  )
}

export default App
