import { VFC } from 'react';
import HomeFlame from '../blueprint/flame/homeFlame';
import HomeHeader from '../parts/assembly/homeHeader';
import HomeContent from '../parts/assembly/homeContent';

const Home: VFC = () => {
  return (
    <HomeFlame
      HeaderPart={HomeHeader}
      HomeContentPart={HomeContent}
    />
  )
}

export default Home