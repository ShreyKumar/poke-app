export interface PokemonType {
  image_url: string,
  types: string[],
  name: string
}

export async function reducePokemon (pokemon: any): Promise<PokemonType> {
  if (!pokemon.url) {
    throw new Error('No URL to get Pokemon details')
  }

  const rawPokemonDetailsResponse = await fetch(pokemon.url)
  const pokemonDetails = await rawPokemonDetailsResponse.json()
  const pokemonTypes = (pokemonDetails?.types ?? []).map((rawType: any) => rawType?.type?.name ?? '')
  const pokemonimage_url = pokemonDetails?.sprites?.front_default ?? ''

  return {
    image_url: pokemonimage_url,
    types: [...pokemonTypes],
    name: pokemonDetails.name
  }
}