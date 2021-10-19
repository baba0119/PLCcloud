import { useContext, VFC } from 'react';
import styled from "styled-components";
import { useRouter } from 'next/router'
import { ladderDisplayContext } from '../../../model/ladderDisplayContextModel';
import { localurl } from '../../../utils/url';
import { ladderRecordDataModel } from '../../../model/ladderDataModel';

// デバッグ開始ボタンのスタイル
const DebugButtonStyle = styled.button`
  background-color: #1fbb27;
  color: #d2ffd4;
  height: 36px;
  width: 64px;
  margin: 10px auto;
  border: none;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
  }
`;

type reqBody = {
  ladder: ladderRecordDataModel[]
}

const DebugButton: VFC = () => {
  const { displayState } = useContext(ladderDisplayContext);
  const router = useRouter()

  const DebugReqest = () => {
    // データの解析・サーバーで読めるよう編集
    const Ladder: reqBody = {
      ladder: displayState.ladderRecordData
    }

    // jsonの形式でデータを保存
    sessionStorage.setItem('ladderData', JSON.stringify(displayState.ladderRecordData));

    // httpリクエスト
    fetch(localurl(), {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Ladder)
    })

    // リダイレクト
    router.push('/debug');
  }

  return (
    <DebugButtonStyle onClick={DebugReqest}>
      debug
    </DebugButtonStyle>
  )
}

// <Link href="/debug" passHref>
// <Link/>

export default DebugButton