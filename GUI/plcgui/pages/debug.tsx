import type { NextPage } from 'next'
import Header from '../components/header/header'
import LadderDebugFormat from '../components/ladder/format/LadderDebugFormat'

const Home: NextPage = () => {
  return (
    <>
      <Header info="debug"/>
      <LadderDebugFormat/>
    </>
  )
}

export default Home
