import { useQuery } from '@apollo/client'
import { Column, Grid, Row, Tile } from 'carbon-components-react'
import Image from 'next/image'
import { useCallback, useMemo } from 'react'

import client from '../apollo/client'
import { POKEMON_QUERY } from '../apollo/queries'
import { FavoriteButton } from '../components/FavoriteButton'
import { Item } from '../components/Item'
import { SoundButton } from '../components/SoundButton'
import styles from '../styles/Detail.module.scss'

const Detail = (props) => {
  const { data } = useQuery(POKEMON_QUERY, {
    variables: { name: props.name },
  })

  const {
    id,
    name,
    image,
    types,
    isFavorite,
    maxCP,
    maxHP,
    weight,
    height,
    evolutions,
    sound,
  } = useMemo(() => (data ? data.pokemonByName : props), [props, data])

  return (
    <Grid>
      <Row>
        <Column lg={6}>
          <Image src={image} width={360} height={336} />
          <SoundButton sound={sound} />
        </Column>
        <Column lg={6}>
          <Tile className={styles.tile}>
            <Grid>
              <Row className={styles.title}>
                <Column>
                  <FavoriteButton id={id} isFavorite={isFavorite} />
                  <h2>{name}</h2>
                  {types.join(', ')}
                </Column>
              </Row>
              <Row>
                <Column sm={3} lg={9}>
                  <div className={styles.cp} />
                </Column>
                <Column sm={1} lg={3}>
                  CP:&nbsp;{maxCP}
                </Column>
              </Row>
              <Row>
                <Column sm={3} lg={9}>
                  <div className={styles.hp} />
                </Column>
                <Column sm={1} lg={3}>
                  HP:&nbsp;{maxHP}
                </Column>
              </Row>
              <Row className={styles.params}>
                <Column>
                  <h5>Weight</h5>
                  {weight.minimum} - {weight.maximum}
                </Column>
                <Column>
                  <h5>Weight</h5>
                  {height.minimum} - {height.maximum}
                </Column>
              </Row>
            </Grid>
          </Tile>
        </Column>
      </Row>
      <Row>
        <Column className={styles.evolutions}>
          <h3>Evolutions</h3>
        </Column>
      </Row>
      <Row>
        {evolutions.map((pokemon) => (
          <Item key={`item_${pokemon.id}`} {...pokemon} isGrid />
        ))}
      </Row>
    </Grid>
  )
}

export const getServerSideProps = async (context) => {
  const { data, error } = await client.query({
    query: POKEMON_QUERY,
    variables: { name: context.params.name },
  })

  if (data.pokemonByName === null) {
    context.res.statusCode = 404
    return { notFound: true }
  }

  return { props: data.pokemonByName }
}

export default Detail
