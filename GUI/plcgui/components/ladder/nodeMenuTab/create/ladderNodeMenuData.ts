// 画像データ読み込み
import a from '../images/a.png'
import b from '../images/b.png'
import outputPoint from '../images/outputPoint.png'
import ConnectLowerBoth from '../images/ConnectLowerBoth.png'
import ConnectLowerLeft from '../images/ConnectLowerLeft.png'
import ConnectLowerRight from '../images/ConnectLowerRight.png'
import ConnectUpperBoth from '../images/ConnectUpperBoth.png'
import ConnectUpperLeft from '../images/ConnectUpperLeft.png'
import ConnectUpperRight from '../images/ConnectUpperRight.png'
import connection from '../images/connection.png'

// uuidを生成する関数のインポート
import { getUniqueStr} from '../../../../utils/uuid';
import { colPatternModel } from '../../../../context/create/ladderNodeMenuContext/NodeMenuContextModel'
import { KindsModel } from '../../../../context/ladderEntity/ladderDataModel'

// 操作の種類
export type ladderNodeMenuDataModel = {
  id:    string           // uuid
  kinds: "node" | "col"
  image: StaticImageData  // 画像データ
  alt:   string           // 画像データが表示されなかったときのテキスト
  control: KindsModel | colPatternModel;    // 操作の種類
}

export const ladderNodeMenuData: ladderNodeMenuDataModel[] = [
  {
    id: getUniqueStr(),
    kinds: "node",
    image: a,
    alt: "a接点",
    control: "a"
  },
  {
    id: getUniqueStr(),
    kinds: "node",
    image: b,
    alt: "b接点",
    control: "b"
  },
  {
    id: getUniqueStr(),
    kinds: "node",
    image: outputPoint,
    alt: "出力",
    control: "relay"
  },
  {
    id: getUniqueStr(),
    kinds: "col",
    image: ConnectUpperLeft,
    alt: "左上と接続",
    control: {
      around: "left",
      col: "up"
    }
  },
  {
    id: getUniqueStr(),
    kinds: "col",
    image: ConnectUpperRight,
    alt: "右上と接続",
    control: {
      around: "right",
      col: "up"
    }
  },
  {
    id: getUniqueStr(),
    kinds: "col",
    image: ConnectUpperBoth,
    alt: "両側上と接続",
    control: {
      around: "both",
      col: "up"
    }
  },
  {
    id: getUniqueStr(),
    kinds: "col",
    image: ConnectLowerLeft,
    alt: "左下と接続",
    control: {
      around: "left",
      col: "low"
    }
  },
  {
    id: getUniqueStr(),
    kinds: "col",
    image: ConnectLowerRight,
    alt: "右下と接続",
    control: {
      around: "right",
      col: "low"
    }
  },
  {
    id: getUniqueStr(),
    kinds: "col",
    image: ConnectLowerBoth,
    alt: "両側下と接続",
    control: {
      around: "both",
      col: "low"
    }
  },
  {
    id: getUniqueStr(),
    kinds: "col",
    image: connection,
    alt: "横に接続",
    control: "contact"
  }
];