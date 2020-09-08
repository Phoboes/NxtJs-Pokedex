import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

function PokemonList({ pokemon }){
  return (
      <>
      <div>
          { pokemon.map((singlePokemon, i) => (
            <Link href="/pokemon/[id]" as={`/pokemon/${singlePokemon.name}`} key={ i }>
              <a>
                <div className={ styles.pokeCardWrap }>
                <p className={styles.pokeCardTitle}> { singlePokemon.name }</p>
                <img src={ singlePokemon.data.sprites.front_default } />
              </div>
              </a>
            </Link>
            )) 
          }
    </div>
    </>
  )
}

PokemonList.getInitialProps = async ( ctx ) => {

  const fetchAllPokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    const json = await res.json()
    return json.results;
  }

  const fetchAllPokemonData = async () => {
      const fetchedList = await fetchAllPokemon()
      const updatedPokemon = fetchedList.map( async ( pokemon ) => {
      const res = await fetch( pokemon.url )
      const json = await res.json()
      pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      pokemon.data = json
      return pokemon
    } )
    return Promise.all( updatedPokemon )
  }

  const pokemon = await fetchAllPokemonData();
  return { pokemon }
}

export default PokemonList

