// 画像データ読み込み
import a from './images/a.png'
import b from './images/b.png'
import ConnectLowerBoth from './images/ConnectLowerBoth.png'
import ConnectLowerLeft from './images/ConnectLowerLeft.png'
import ConnectLowerRight from './images/ConnectLowerRight.png'
import ConnectUpperBoth from './images/ConnectUpperBoth.png'
import ConnectUpperLeft from './images/ConnectUpperLeft.png'
import ConnectUpperRight from './images/ConnectUpperRight.png'
import outputPoint from './images/outputPoint.png'

// uuidを生成する関数のインポート
import { getUniqueStr} from '../../infrastructure/uuid';

type ladderNodeMenuDataModel = {
  id:    string,          // uuid
  image: StaticImageData  // 画像データ
  alt:   string           // 画像データが表示されなかったときのテキスト
}

export const ladderNodeMenuData: ladderNodeMenuDataModel[] = [
  {
    id: getUniqueStr(),
    image: a,
    alt: "a接点"
  },
  {
    id: getUniqueStr(),
    image: b,
    alt: "b接点"
  },
  {
    id: getUniqueStr(),
    image: outputPoint,
    alt: "出力"
  },
  {
    id: getUniqueStr(),
    image: ConnectUpperLeft,
    alt: "左上と接続"
  },
  {
    id: getUniqueStr(),
    image: ConnectUpperRight,
    alt: "右上と接続"
  },
  {
    id: getUniqueStr(),
    image: ConnectUpperBoth,
    alt: "両側上と接続"
  },
  {
    id: getUniqueStr(),
    image: ConnectLowerLeft,
    alt: "左下と接続"
  },
  {
    id: getUniqueStr(),
    image: ConnectLowerRight,
    alt: "右下と接続"
  },
  {
    id: getUniqueStr(),
    image: ConnectLowerBoth,
    alt: "両側下と接続"
  }
];