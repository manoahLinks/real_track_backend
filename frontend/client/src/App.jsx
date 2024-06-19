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
  query{
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
