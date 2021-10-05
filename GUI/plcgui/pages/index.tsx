import type { NextPage } from 'next'
import Header from '../components/header/header'
import LadderCreateFormat from '../components/ladder/format/LadderCreateFormat'

const Home: NextPage = () => {
  return (
    <>
      <Header info="index"/>
      <LadderCreateFormat/>
    </>
  )
}

export default Home
