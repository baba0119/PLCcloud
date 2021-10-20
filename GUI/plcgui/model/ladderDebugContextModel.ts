import { createContext } from "react"
import { ioStateModel } from "../context/ladderEntity/ladderInitialState"

export type ioStateSetModel = {
  ioList: ioStateModel[]
  ioType: "input" | "output"
}

export type inputControlActionModel = {
  ioStateSet: (ioState: ioStateSetModel) => void;
}

export const inputActionContext = createContext<inputControlActionModel>({} as inputControlActionModel)