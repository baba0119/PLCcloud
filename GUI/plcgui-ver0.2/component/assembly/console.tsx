import { VFC } from 'react';
import ConsoleFlame from '../blueprint/flame/consoleFlame';
import RemoveHeader from "../parts/assembly/removeHeader";
import ProjectName from "../parts/assembly/projectName";
import PLCUniqueNumber from "../parts/assembly/plcUniqueNumber";
import PLCContorol from '../parts/assembly/plcControl';

const Console: VFC = () => {
  return (
    <ConsoleFlame
      HeaderPart={RemoveHeader}
      ProjectNamePart={ProjectName}
      PLCUniqueNumberPart={PLCUniqueNumber}
      PLCControlPart={PLCContorol}
    />
  )
}

export default Console