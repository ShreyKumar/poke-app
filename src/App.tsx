import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, Spinner, Table } from 'react-bootstrap';
import { PokemonType, reducePokemon } from './utils/pokemonUtils'
import { addPokemon, getPokemon } from './utils/apiActions';
import PokemonList from './components/PokemonList';
import AddRow from './components/AddRow';

const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/'

function App() {
  const [showAddRow, setShowAddRow] = useState<boolean>(false)
  const [pokemon, setPokemon] = useState<PokemonType[]>([])
  const [showApiData, setShowApiData] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    const asyncGetPokemon = async () => {
      const rawResponse = await fetch(POKEMON_URL)
      const allPokemon = await rawResponse.json()

      const reducedPokemon: PokemonType[] = await Promise.all((allPokemon?.results ?? []).map(async (pokemon: unknown) => await reducePokemon(pokemon)))
      setPokemon(reducedPokemon)
    }

    const asyncGetPokemonFromDB = async () => {
      const allPokemon = await getPokemon()
      setPokemon([...allPokemon])
    }

    if (showApiData) {
      asyncGetPokemon()
    } else {
      asyncGetPokemonFromDB()
    }
    setLoading(false)
  }, [showApiData])

  if (loading) {
    return <div className='text-center'><Spinner animation='grow' /></div>
  }

  return (
    <div>
      <h1 className='text-center my-4'>Poke app!</h1>
      <Button onClick={() => setShowAddRow(!showAddRow)}>Add new Pokemon</Button>
      <Button onClick={() => setShowApiData(!showApiData)}>{showApiData ? 'Show DB data' : 'Show API data'}</Button>
      <Table bordered>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Types</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {
            showAddRow && <AddRow addPokemon={async (newPokemon) => {
              await addPokemon({ ...newPokemon })
              setPokemon([newPokemon, ...pokemon])
              setShowAddRow(false)
            }} />
          }
          <PokemonList pokemonList={pokemon} setPokemon={setPokemon} showDeleteBtn={!showApiData} />
        </tbody>
      </Table>
    </div>
  );
}

export default App;
