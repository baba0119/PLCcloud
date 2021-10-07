import { VFC } from "react";
import Image from 'next/image';
import styled from "styled-components";
// 画像の読み込み
import a from '../../images/a.png'
import b from '../../images/b.png'
import contact from '../../images/contact.png'
import { inputKinds } from "../../../../../context/ladderEntity/ladderDataModel";

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
// 普通入力ノード
//
type inputNodeKindsModel = {
  [index: string]: {
    src: StaticImageData
    alt: string
  }
}

type Props = {
  name: string
  kinds: inputKinds | "relay" | ""
}
const NomalInput: VFC<Props> = ({ name, kinds }) => {
  const inputNodeKinds: inputNodeKindsModel = {};
  inputNodeKinds["a"] = {
    src: a,
    alt: "a接点"
  }
  inputNodeKinds["b"] = {
    src: b,
    alt: "b接点"
  }
  inputNodeKinds["contact"] = {
    src: contact,
    alt: "接続"
  }

  return (
    <Parent>
      <NameParent>
        <NodeName>{name}</NodeName>
      </NameParent>
      <NodeImage>
        <Image
          src={inputNodeKinds[kinds].src}
          alt={inputNodeKinds[kinds].alt}
          width={94}
        />
      </NodeImage>
    </Parent>
  )
}

export default NomalInput