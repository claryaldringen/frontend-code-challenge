import {
  AspectRatio,
  Column,
  StructuredListCell,
  StructuredListRow,
} from 'carbon-components-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'

import { FavoriteButton } from '../FavoriteButton'
import styles from './Item.module.scss'

export const Item = ({ id, image, name, types, isFavorite, isGrid }) => {
  const typeLabel = useMemo(() => types && types.join(', '), [types])

  if (isGrid) {
    return (
      <Column md={2}>
        <AspectRatio ratio="3x4" className={styles.card}>
          <Link href={`/${name}`} passHref>
            <a>
              <Image src={image} width={360} height={336} />
            </a>
          </Link>
          <div>
            <FavoriteButton id={id} isFavorite={isFavorite} />
            <h4>{name}</h4>
            {typeLabel}
          </div>
        </AspectRatio>
      </Column>
    )
  }

  return (
    <StructuredListRow>
      <StructuredListCell className={styles.imageCell}>
        <Link href={`/${name}`} passHref>
          <a className={styles.link}>
            <Image src={image} width={360} height={336} />
          </a>
        </Link>
      </StructuredListCell>

      <StructuredListCell head>
        <Link href={`/${name}`} passHref>
          <a className={styles.link}>
            <h4>{name}</h4>
            {typeLabel}
          </a>
        </Link>
      </StructuredListCell>

      <StructuredListCell>
        <FavoriteButton id={id} isFavorite={isFavorite} />
      </StructuredListCell>
    </StructuredListRow>
  )
}
