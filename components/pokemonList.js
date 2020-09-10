import Head from 'next/head'
import styles from '../styles/PokemonList.module.css'
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
                <img className={ styles.pokeCardImg } src={ singlePokemon.data.sprites.front_default } />
              </div>
              </a>
            </Link>
            )) 
          }
    </div>
    </>
  )
}

export default PokemonList

