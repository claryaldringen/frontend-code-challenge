import { useMutation } from '@apollo/client'

import { FAVORITE_MUTATION, UNFAVORITE_MUTATION } from '../apollo/mutations'

export const useFavoriteMutation = () => {
  const options = {
    update: (cache, { data }) => {
      const affectedPokemon = data.favoritePokemon ?? data.unFavoritePokemon
      cache.modify({
        fields: {
          pokemons: (existingPokemonConnection) => {
            const edges = existingPokemonConnection.edges.map((pokemon) =>
              pokemon.id === affectedPokemon.id
                ? { ...pokemon, isFavorite: affectedPokemon.isFavorite }
                : pokemon
            )
            return { ...existingPokemonConnection, edges }
          },
        },
      })
    },
    onQueryUpdated: (observableQuery) => {
      observableQuery.refetch()
    },
  }

  const [favoriteMutation] = useMutation(FAVORITE_MUTATION, options)
  const [unfavoriteMutation] = useMutation(UNFAVORITE_MUTATION, options)

  return { favoriteMutation, unfavoriteMutation }
}
