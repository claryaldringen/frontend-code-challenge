import { InlineNotification } from 'carbon-components-react'
import { useCallback } from 'react'

import { useErrorContext } from '../../contexts'
import { REMOVE_ERROR } from '../../reducers'
import styles from '../FavoriteButton/FavoriteButton.module.scss'

export const ErrorNotification = () => {
  const { state, dispatch } = useErrorContext()

  const handleClose = useCallback(
    () => dispatch({ type: REMOVE_ERROR }),
    [dispatch]
  )

  if (state.error) {
    return (
      <InlineNotification
        kind="error"
        title="Error"
        subtitle={state.error}
        className={styles.error}
        onClose={handleClose}
      />
    )
  }

  return null
}
