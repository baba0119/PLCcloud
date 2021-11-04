import { VFC } from "react";
import Image from 'next/image';
import styled from "styled-components";
import output from '../../images/output.png'

//
// スタイル
//
const Parent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const NameParent = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
`;

const NodeName = styled.p`

`;

// 画像を中央に寄せる
const NodeImage = styled.div`
  width: 96px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

//
// 普通出力ノード
//
type Props = {
  name: string
}
const NomalOutput: VFC<Props> = ({ name }) => {
  return (
    <Parent>
      <NameParent>
        <NodeName>{name}</NodeName>
      </NameParent>
      <NodeImage>
        <Image src={output} alt="output" width={94}/>
      </NodeImage>
    </Parent>
  )
}

export default NomalOutput