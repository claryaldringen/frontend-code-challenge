import { gql } from '@apollo/client'

export const FAVORITE_MUTATION = gql`
  mutation Favorite($id: ID!) {
    favoritePokemon(id: $id) {
      id
      isFavorite
    }
  }
`

export const UNFAVORITE_MUTATION = gql`
  mutation Unfavorite($id: ID!) {
    unFavoritePokemon(id: $id) {
      id
      isFavorite
    }
  }
`
