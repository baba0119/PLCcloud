import { VFC } from 'react';
import HomeFlame from '../blueprint/flame/homeFlame';
import HomeHeader from '../parts/assembly/homeHeader';

const Home: VFC = () => {
  return (
    <HomeFlame
      HeaderPart={HomeHeader}
    />
  )
}

export default Home