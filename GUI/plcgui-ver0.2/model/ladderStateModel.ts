import { ladderDataModel } from "./ladderDataModel";

export type point = {
  x: number;
  y: number;
}

export type ladderConvertNodeModel = {
  ladderNode: ladderDataModel;
  point: point;
  mode: "debug" | "create"
  isSave: boolean
}