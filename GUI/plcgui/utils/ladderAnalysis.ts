import { ladderConvertNodeModel } from "../model/ladderConvertModel";
import { ladderRecordDataModel } from "../model/ladderDataModel";

// ラダープログラムの解析・変換
export const ladderAnalysis = (ladderRecordData: ladderRecordDataModel[]): ladderConvertNodeModel[] => {
  const ladderConvertData: ladderConvertNodeModel[] = [];

  ladderRecordData.map((record, y) => {
    record.ladderData.map((node, x )=> {
      if (
        node.isProof ||
        node.colState.isDownCol ||
        node.colState.isUpCol
      ) {
        const convertNode: ladderConvertNodeModel = {
          ladderNode: node,
          point: {
            x: x,
            y: y
          }
        }
        ladderConvertData.push(convertNode);
      }
    })
  })

  return ladderConvertData;
}