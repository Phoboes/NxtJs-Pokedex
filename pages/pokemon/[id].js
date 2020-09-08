import { useRouter } from 'next/router'
import axios from 'axios'

function Pokemon({ pokemon }){
  const router = useRouter()
  const { id } = router.query

  if( pokemon ){
    return <p>Pokemon ID: {id}, <img src={ pokemon.sprites.front_default }/></p>
  } else {
    return <p className={errorText}>We can't find that one.</p>
  }

}

Pokemon.getInitialProps = async ( ctx ) => {
  const pokemonName = ctx.query.id
  const url = `https://pokeapi.co/api/v2/pokemon/${ pokemonName }`.toLowerCase();
  // const getPokemon = async ( ) => {
  //   const res = await fetch( url )
  //   const json = await res.json()
  //   return json
  // }

  async function getPokemon() {
    const pokemonName = ctx.query.id
    const url = `https://pokeapi.co/api/v2/pokemon/${ pokemonName }`.toLowerCase();
    try {
      const response = await axios.get( url );
      console.log(response.data);
      return response.data
    } catch (error) {
      return error.data
      console.error(error);
    }
  }

  const pokemon = await getPokemon();
  return { pokemon }
}

async function getPokemon() {
  const pokemonName = ctx.query.id
  const url = `https://pokeapi.co/api/v2/pokemon/${ pokemonName }`.toLowerCase();
  try {
    const response = await axios.get( url );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export default Pokemon
