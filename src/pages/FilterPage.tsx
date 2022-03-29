import React,{useState} from 'react'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

import { count } from 'console';
import { stringify } from 'querystring';

  const getData = gql`
  query dataGet {
    countries {
      code
      name
    }
  }
`;

interface CountriesState {
    countries:{
        code: string
        name: string
    }[]
}

interface Country{
    code: string
    name: string
}
  

export default function FilterPage() {

    const [countries, setCountries] = useState<Country[]>([]);
  const [text,setText] = useState<string>("");

  const { loading, error, data } = useQuery(getData);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;


  

  console.log(data.countries)

  const handleFilter = (e:any) =>{
    e.preventDefault()
    console.log(e.target.value.toLowerCase())
    const filteredCountries = data.countries.filter((country:Country) => country.code.toLowerCase().startsWith(e.target.value.toLowerCase()))
    setCountries(filteredCountries)
    return filteredCountries
  }


  return (
      <div className='container'>
          <section className='sectionType'>
              <h2>Enter a text to filter the countries with country codes</h2>
              <input type="text"  onChange={(e) => handleFilter(e)}/>
          </section>

        <section className='dataContainer'>
        {countries.map((country:Country) => (
                <div key={country.code} className="countryContainer">
                    <h2>
                        {country.name}
                    </h2>
                    <h2>
                        {country.code}
                    </h2>
                </div>
          ))}
        </section>
         
      </div>
  )
}
