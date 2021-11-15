import { ladderDataModel, ladderRecordDataModel } from "./ladderDataModel";

export type point = {
  x: number;
  y: number;
}

export type ladderCreatetDisplayModel = {
  ladderRecordData: ladderRecordDataModel[];
  point: point;
  mode: "debug" | "create"
  isSave: boolean
}