import { colPatternModel } from "../../../../../model/colPatternModel";
import { KindsModel } from "../../../../../model/ladderDataModel";

// 操作の種類
type ladderNodeMenuDataModel = {
  id:    string           // uuid
  kinds: "node" | "col"
  image: StaticImageData  // 画像データ
  alt:   string           // 画像データが表示されなかったときのテキスト
  control: KindsModel | colPatternModel;    // 操作の種類
}

// エンティティのデータ型
export type placementDataModel = {
  panelTitle: string
  placementMenuData: ladderNodeMenuDataModel
}