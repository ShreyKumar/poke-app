import { PokemonType } from "./pokemonUtils";

const API_URL = process.env.REACT_APP_API_URL

export async function getPokemon (): Promise<PokemonType[]> {
  const rawResponse = await fetch(`${API_URL}/pokemon`)

  return await rawResponse.json()
}

export async function addPokemon (pokemon: PokemonType) {
  await fetch(`${API_URL}/pokemon`, {
    method: 'POST',
    body: JSON.stringify({ pokemon }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export async function deletePokemon (name: string) {
  await fetch(`${API_URL}/pokemon/${name}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export async function syncPokemon (allPokemon: PokemonType[]) {
  try {
    const res = await fetch(`${API_URL}/pokemon/sync`, {
      method: 'POST',
      body: JSON.stringify({ allPokemon }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(res.json())

  } catch (error) {
  }
}
