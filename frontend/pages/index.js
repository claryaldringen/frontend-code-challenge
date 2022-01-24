import { useQuery } from '@apollo/client'
import { InlineNotification } from 'carbon-components-react'
import Head from 'next/head'
import { useCallback, useEffect, useMemo, useState } from 'react'

import client from '../apollo/client'
import { POKEMONS_QUERY } from '../apollo/queries'
import { Layout } from '../components/Layout'
import { ToolBar } from '../components/ToolBar'

const Home = ({ initialData }) => {
  const [isListView, setIsListView] = useState(false)

  const { data, fetchMore, refetch } = useQuery(POKEMONS_QUERY, {
    variables: { offset: 0, limit: 12 },
  })

  const pokemons = useMemo(
    () => (data ? data.pokemons.edges : initialData),
    [data, initialData]
  )

  const handleScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      fetchMore({
        variables: { offset: pokemons.length, limit: 12 },
      })
    }
  }, [pokemons.length, fetchMore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleTypeChange = useCallback((type) => refetch({ type }), [refetch])

  const handleSearchChange = useCallback(
    (search) => {
      refetch({ search })
    },
    [refetch]
  )

  const handleSwitchFavorites = useCallback(
    (isFavorite) => {
      refetch({ isFavorite })
    },
    [refetch]
  )

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ToolBar
          setIsListView={setIsListView}
          isListView={isListView}
          onTypeChange={handleTypeChange}
          onSearchChange={handleSearchChange}
          onFavoriteSwitcherChange={handleSwitchFavorites}
        />
        <Layout pokemons={pokemons} isList={isListView} />
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const { data } = await client.query({
    query: POKEMONS_QUERY,
    variables: { offset: 0, limit: 12 },
  })

  return { props: { initialData: data.pokemons.edges } }
}

export default Home
