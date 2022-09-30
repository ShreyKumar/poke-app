import { useState } from "react"
import { Button } from "react-bootstrap"
import { PokemonType } from "../utils/pokemonUtils"

interface AddRowProps {
  addPokemon: (pokemon: PokemonType) => void
}

export default function AddRow ({ addPokemon }: AddRowProps) {
  const [image, setImage] = useState<string>("")
  const [types, setTypes] = useState<string[]>([])
  const [name, setName] = useState<string>("")

  return (
    <tr>
      <td><input type="text" name="image" id="image" onChange={(e) => setImage(e.target.value)}/></td>
      <td><input type="text" name="types" id="types" onChange={(e) => setTypes(e.target.value.split(','))} /></td>
      <td><input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} /></td>
      <td><Button onClick={() => addPokemon({ image_url: image, types, name })}>Submit</Button></td>
    </tr>
  )
}
