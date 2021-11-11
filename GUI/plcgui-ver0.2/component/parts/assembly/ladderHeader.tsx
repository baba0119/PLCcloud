import { VFC } from 'react';
import styled from 'styled-components';
import ModeSelectButton from '../planefigure/ladderHeader/modeSelectButton';
import TopMonitor from '../planefigure/ladderHeader/topMonitor';

const AreaParent = styled.div`
  width: 100%;
  height: 8vh;
  margin: 0;
  background-color: #e7e7e7;
  border-bottom: 2px solid #a8a8a8;
`;

const TopMonitorArea = styled.div`
  height: 4.6vh;
  border-bottom: 1px solid #cfcfcf;
`;

const ModeSelectPanel = styled.div`
  height: 3.4vh;
  background-color: #f5f5f5;
  border-bottom: 1px solid #cfcfcf;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LadderHeader: VFC = () => {
  return (
    <AreaParent>
      <TopMonitorArea>
        <TopMonitor/>
      </TopMonitorArea>
      <ModeSelectPanel>
        <ModeSelectButton/>
      </ModeSelectPanel>
    </AreaParent>
  )
}

export default LadderHeader