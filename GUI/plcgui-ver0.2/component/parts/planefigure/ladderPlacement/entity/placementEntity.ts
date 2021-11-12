import { v4 as uuidv4 } from 'uuid';
import { placementDataModel } from './placementDataModel';

// 画像データ読み込み
import a from './images/a.png'
import b from './images/b.png'
import outputPoint from './images/outputPoint.png'
import ConnectLowerBoth from './images/ConnectLowerBoth.png'
import ConnectLowerLeft from './images/ConnectLowerLeft.png'
import ConnectLowerRight from './images/ConnectLowerRight.png'
import ConnectUpperBoth from './images/ConnectUpperBoth.png'
import ConnectUpperLeft from './images/ConnectUpperLeft.png'
import ConnectUpperRight from './images/ConnectUpperRight.png'
import connection from './images/connection.png'

export const placementPanelEntity: placementDataModel[] = [
  {
    panelTitle: "接点",
    placementMenuData: [
      {
        id: uuidv4(),
        kinds: "node",
        image: a,
        alt: "a接点",
        control: "vrA"
      },
      {
        id: uuidv4(),
        kinds: "node",
        image: b,
        alt: "b接点",
        control: "vrB"
      },
      {
        id: uuidv4(),
        kinds: "node",
        image: outputPoint,
        alt: "出力",
        control: "vrio"
      },
      {
        id: uuidv4(),
        kinds: "node",
        image: connection,
        alt: "横に接続",
        control: "contact"
      }
    ]
  },
  {
    panelTitle: "接続",
    placementMenuData: [
      {
        id: uuidv4(),
        kinds: "col",
        image: ConnectUpperLeft,
        alt: "左上と接続",
        control: {
          around: "left",
          col: "up"
        }
      },
      {
        id: uuidv4(),
        kinds: "col",
        image: ConnectUpperRight,
        alt: "右上と接続",
        control: {
          around: "right",
          col: "up"
        }
      },
      {
        id: uuidv4(),
        kinds: "col",
        image: ConnectUpperBoth,
        alt: "両側上と接続",
        control: {
          around: "both",
          col: "up"
        }
      },
      {
        id: uuidv4(),
        kinds: "col",
        image: ConnectLowerLeft,
        alt: "左下と接続",
        control: {
          around: "left",
          col: "low"
        }
      },
      {
        id: uuidv4(),
        kinds: "col",
        image: ConnectLowerRight,
        alt: "右下と接続",
        control: {
          around: "right",
          col: "low"
        }
      },
      {
        id: uuidv4(),
        kinds: "col",
        image: ConnectLowerBoth,
        alt: "両側下と接続",
        control: {
          around: "both",
          col: "low"
        }
      }
    ]
  }
]