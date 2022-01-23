import {
  Grid,
  Row,
  StructuredListBody,
  StructuredListWrapper,
} from 'carbon-components-react'

import { Item } from '../Item'
import styles from './Layout.module.scss'

export const Layout = ({ pokemons, isList }) => {
  if (isList) {
    return (
      <StructuredListWrapper className={styles.layout}>
        <StructuredListBody>
          {pokemons.map((pokemon) => (
            <Item key={`row_${pokemon.id}`} {...pokemon} />
          ))}
        </StructuredListBody>
      </StructuredListWrapper>
    )
  }

  return (
    <Grid className={styles.layout}>
      <Row>
        {pokemons.map((pokemon) => (
          <Item key={`card_${pokemon.id}`} {...pokemon} isGrid />
        ))}
      </Row>
    </Grid>
  )
}
