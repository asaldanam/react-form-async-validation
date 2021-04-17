import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useFormAsyncContext } from '../../../providers/formAsyncState';
import { Input as AntdInput, Typography } from 'antd';
import * as S from '../styles';
const { Text } = Typography;

const Input = ({ name }: { name: string }) => {
  const { control } = useFormContext();
  const { triggerCheck, asyncState } = useFormAsyncContext(name);

  const { error, disabled } = asyncState;
  return useMemo(() => {
    console.info(`%crender ${name}`, 'background: #ffeb3b; color: #222', asyncState);
    return (
      <div>
        <label><Text>{name}</Text></label>
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onBlur, ...field } }) => (
            <AntdInput
              {...field}
              value={value || ''}
              placeholder={name}
              disabled={disabled}
              onBlur={() => {
                triggerCheck();
                return onBlur();
              }}
            />
          )}
        />
        <S.ErrorHint>{error}</S.ErrorHint>
      </div>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(asyncState)])
}

export default Input;