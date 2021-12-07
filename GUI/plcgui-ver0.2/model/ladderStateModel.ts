import { ladderRecordDataModel } from "./ladderDataModel";

export type point = {
  x: number;
  y: number;
}

export type ioStateModel = {
  nodeName: string;
  ioState: boolean;
}

export type ladderCreatetDisplayModel = {
  ladderRecordData: ladderRecordDataModel[];
  point: point;
  mode: "debug" | "create"
  isSave: boolean
  inputState: ioStateModel[]
  outputState: ioStateModel[]
}