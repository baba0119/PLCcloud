import { createContext } from "react"
import { ioStateModel } from "../context/ladderEntity/ladderInitialState"

// 入力部コンテキスト(処理のみ)
export type inputControlActionModel = {
  ioStateSet: (ioState: ioStateModel[]) => void;
}

export const inputActionContext = createContext<inputControlActionModel>({} as inputControlActionModel)

// 出力部コンテキスト(viewのみ)
export type outputNodeStateModel = {
  nodeList: ioStateModel[]
}

export const outputStateContext = createContext<outputNodeStateModel>({} as outputNodeStateModel)