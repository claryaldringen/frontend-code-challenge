import { gql } from '@apollo/client'

export const POKEMONS_QUERY = gql`
  query Pokemons(
    $limit: Int
    $offset: Int
    $type: String
    $isFavorite: Boolean
    $search: String
  ) {
    pokemons(
      query: {
        limit: $limit
        offset: $offset
        search: $search
        filter: { type: $type, isFavorite: $isFavorite }
      }
    ) {
      edges {
        id
        name
        image
        types
        isFavorite
      }
    }
  }
`

export const POKEMON_TYPES_QUERY = gql`
  query PokemonTypes {
    pokemonTypes
  }
`

export const POKEMON_QUERY = gql`
  query Pokemon($name: String!) {
    pokemonByName(name: $name) {
      id
      name
      image
      types
      maxCP
      maxHP
      sound
      isFavorite
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      evolutions {
        id
        image
        name
        isFavorite
      }
    }
  }
`
