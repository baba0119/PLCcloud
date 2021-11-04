import { ioStateModel } from "../../../context/ladderEntity/ladderInitialState";
import { ladderRecordDataModel } from "../../../model/ladderDataModel";

export const ladderOutputAnalysis = (ladder: ladderRecordDataModel[]): ioStateModel[] => {
  const outputList: ioStateModel[] = [];

  ladder.map(record => {
    record.ladderData.map(node => {
      const info = node.ladderNode.info;
      if ( info === "relay" ) {
        outputList.push({
          nodeName: node.ladderNode.name,
          ioState: false
        })
      }
    })
  })

  return outputList
}