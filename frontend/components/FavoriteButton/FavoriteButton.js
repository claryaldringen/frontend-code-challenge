import { Favorite32, FavoriteFilled32 } from '@carbon/icons-react'
import { InlineNotification } from 'carbon-components-react'
import { useCallback, useContext, useReducer, useState } from 'react'

import { useErrorContext } from '../../contexts'
import { useFavoriteMutation } from '../../hooks'
import { CREATE_ERROR } from '../../reducers'
import styles from './FavoriteButton.module.scss'

export const FavoriteButton = ({ id, isFavorite }) => {
  const { favoriteMutation, unfavoriteMutation } = useFavoriteMutation()
  const { dispatch } = useErrorContext()

  const handleClick = useCallback(async () => {
    try {
      isFavorite
        ? await unfavoriteMutation({ variables: { id } })
        : await favoriteMutation({ variables: { id } })
    } catch (err) {
      dispatch({ type: CREATE_ERROR, error: err.message })
    }
  }, [id, isFavorite, favoriteMutation, unfavoriteMutation])

  return (
    <button className={styles.button} onClick={handleClick}>
      {isFavorite ? <FavoriteFilled32 /> : <Favorite32 />}
    </button>
  )
}
