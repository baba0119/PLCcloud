import { ioStateModel } from "../../../context/ladderEntity/ladderInitialState";
import { ladderRecordDataModel } from "../../../model/ladderDataModel";

export const ladderInputAnalysis = (ladder: ladderRecordDataModel[]): ioStateModel[] => {
  const inputList: ioStateModel[] = [];

  ladder.map(record => {
    record.ladderData.map(node => {
      const info = node.ladderNode.info;
      if ( info === "a" || info === "b" ) {
        inputList.push({
          nodeName: node.ladderNode.name,
          ioState: false
        })
      }
    })
  })

  const returnInputList = inputList.filter(node => ~node.nodeName.indexOf("Gpio"))

  return returnInputList
}