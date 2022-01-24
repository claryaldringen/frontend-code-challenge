import { useQuery } from '@apollo/client'
import { Menu32, Thumbnail_232 } from '@carbon/icons-react'
import {
  Button,
  Column,
  ComboBox,
  ContentSwitcher,
  Grid,
  Row,
  Search,
  Switch,
} from 'carbon-components-react'
import { useCallback, useRef } from 'react'

import { POKEMON_TYPES_QUERY } from '../../apollo/queries'
import styles from './ToolBar.module.scss'

const ALL = 'all'
const FAVORITES = 'favorites'

export const ToolBar = ({
  setIsListView,
  isListView,
  onTypeChange,
  onSearchChange,
  onFavoriteSwitcherChange,
}) => {
  const { data } = useQuery(POKEMON_TYPES_QUERY)
  const ref = useRef()

  const handleClick = (value) => () => {
    setIsListView(value)
  }

  const handleTypeChange = useCallback(
    ({ selectedItem }) => {
      onTypeChange(selectedItem)
    },
    [onTypeChange]
  )

  const handleSearchChange = useCallback(
    (event) => {
      clearTimeout(ref.current.timeout)
      ref.current.timeout = setTimeout(
        () => onSearchChange(event.target.value),
        500
      )
    },
    [onSearchChange, ref]
  )

  const handleFavoriteSwitcherChange = useCallback(
    ({ name }) => {
      onFavoriteSwitcherChange(name === FAVORITES)
    },
    [onFavoriteSwitcherChange]
  )

  return (
    <Grid className={styles.toolbar} fullWidth>
      <Row>
        <Column>
          <ContentSwitcher
            onChange={handleFavoriteSwitcherChange}
            className={styles.switcher}
          >
            <Switch name={ALL} text="All" />
            <Switch name={FAVORITES} text="Favorites" />
          </ContentSwitcher>
        </Column>
      </Row>
      <Row>
        <Column>
          <Search
            id="search-name"
            onChange={handleSearchChange}
            light
            labelText=""
            ref={ref}
          />
        </Column>
        <Column>
          <ComboBox
            placeholder="Type"
            onChange={handleTypeChange}
            id="combo-type"
            items={data?.pokemonTypes ?? []}
            light
          />
        </Column>
        <Column>
          <Button
            renderIcon={Thumbnail_232}
            iconDescription="Grid view"
            hasIconOnly
            onClick={handleClick(false)}
            kind={isListView ? 'tertiary' : 'primary'}
          />
          <Button
            renderIcon={Menu32}
            iconDescription="List view"
            hasIconOnly
            onClick={handleClick(true)}
            kind={isListView ? 'primary' : 'tertiary'}
          />
        </Column>
      </Row>
    </Grid>
  )
}
