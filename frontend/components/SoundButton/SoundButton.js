import { VolumeUp32 } from '@carbon/icons-react'
import { useCallback } from 'react'

import styles from './SoundButton.module.scss'

export const SoundButton = ({ sound }) => {
  const handleClick = useCallback(() => {
    const audio = new Audio(sound)
    audio.play()
  }, [sound])

  return (
    <button onClick={handleClick} className={styles.button}>
      <VolumeUp32 />
    </button>
  )
}
