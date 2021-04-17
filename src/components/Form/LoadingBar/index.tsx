import React, { useContext } from 'react';
import { FormAsyncStateContext } from '../../../providers/formAsyncState';
import { Progress } from 'antd';
import * as S from '../styles';

const LoadingBar = () => {
  const { formAsyncState } = useContext(FormAsyncStateContext);

  return (
    <S.ProgressBar style={{ opacity: formAsyncState.loading ? 1 : 0 }}>
      <Progress percent={100} status="active" />
    </S.ProgressBar>
  )
}

export default LoadingBar;