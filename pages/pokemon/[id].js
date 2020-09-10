import { useRouter } from 'next/router'
import styles from '../../styles/PokemonView.module.css'
import axios from 'axios'
import Link from 'next/link'

function Pokemon({ pokemon }){
  const router = useRouter()
  const { id } = router.query

  if( pokemon ){
    return (
            <div className={ styles.cardWrap }>
              <div className={ styles.titleWrapper }>
                <p className={ styles.pageTitle } >Pokemon ID:</p>
                <h2 className={ styles.pokeTitle }>{id}</h2>
              </div>
              <div className={ styles.imgWrap }>
                <img className={ styles.pokeImg } src={ pokemon.sprites.front_default }/>
              </div>
              <Link href="/">
                <a className={ styles.homeButton }>Home</a>
              </Link>
            </div>
            )
  } else {
    return (
      <div className={ styles.cardWrap }>
        <p className={ `${ styles.pageTitle } ${ styles.errorText }`  }>We can't find that one.</p>
        <Link href="/">
          <a className={ styles.homeButton }>Home</a>
        </Link>
      </div>
      )
  }

}

Pokemon.getInitialProps = async ( ctx ) => {
  const pokemonName = ctx.query.id
  const url = `https://pokeapi.co/api/v2/pokemon/${ pokemonName }`.toLowerCase();

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
