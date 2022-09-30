import { Button } from 'react-bootstrap'
import { deletePokemon } from '../utils/apiActions';
import { PokemonType } from "../utils/pokemonUtils";

interface PokemonListProps {
  pokemonList: PokemonType[]
  setPokemon: (pList: PokemonType[]) => void
  showDeleteBtn: boolean
}

export default function PokemonList ({ pokemonList, setPokemon, showDeleteBtn }: PokemonListProps) {
  return (
    <>
      {
        pokemonList.map(({ name, types, image_url }: PokemonType) => {
          return (
            <tr>
              <td><img src={image_url} /></td>
              <td>{types.join(',')}</td>
              <td>{name}</td>
                {
                  showDeleteBtn && (
                    <td>
                      <Button
                        variant='danger'
                        onClick={async () => {
                          setPokemon([...pokemonList.filter(({ name: pokemonName } : PokemonType) => name !== pokemonName)])
                          await deletePokemon(name)
                      }}>
                        Delete
                      </Button>
                    </td>
                  )
                }
            </tr>
          )
        })
      }
    </>
  )
}