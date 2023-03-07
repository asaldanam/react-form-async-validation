import React, { useEffect, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useFormAsyncContext } from '../../../providers/formAsyncState';
import { Input as AntdInput, Typography } from 'antd';
import * as S from '../styles';
const { Text } = Typography;

const AsyncInput = ({ name }: { name: string }) => {
  // Métodos y estado de React hooks form
  const form = useFormContext();
  const { control, formState: { touchedFields }, setValue, getValues } = form;

  // Comprueba si el campo está tocado
  const isTouched = touchedFields[name];
  const currentFormValue = (getValues() || {})[name];

  // Estado asíncrono de la API
  const { triggerCheck, asyncState } = useFormAsyncContext(form ,name);
  const { error, disabled, hidden, value } = asyncState;

  // Actualiza en el formulario el value si este viene impuesto desde la API
  useEffect(() => {
    const hasValue = value !== null && value !== undefined;
    const valueChanged = value !== currentFormValue;
    
    if (hasValue && valueChanged) {
      console.log('UPDATE:', name, value);
      setValue(name, value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  
  // Memoiza el componente para que sólo haga render si ha cambiado el estado asíncrono
  return useMemo(() => {
    console.info(`%crender ${name}`, 'background: #ffeb3b; color: #222', {asyncState});
    
    if (hidden) return null;
    
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
        <S.ErrorHint>{isTouched && error}</S.ErrorHint>
      </div>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(asyncState)])
}

export default AsyncInput;