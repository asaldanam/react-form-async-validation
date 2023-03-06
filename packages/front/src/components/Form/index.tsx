import { Button } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useFormAsyncContext } from '../../providers/formAsyncState';
import AsyncInput from './AsyncInput';
import LoadingBar from './LoadingBar';
import * as S from './styles';

function Form() {
  const form = useForm();
  const { handleSubmit } = form;
  const { triggerCheck, formAsyncState } = useFormAsyncContext(form);

  const isEmpty = Object.keys(formAsyncState?.fields || []).length === 0;

  const onSubmit = (data) =>{
    console.log('SUBMIT', data);
    triggerCheck();
  };

  const onError = (error) => console.error(error);

  // Realiza la primera validación para obtener el estado del formulario
  useEffect(() => {
    triggerCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isEmpty) return null;

  return (
    <S.FormContainer>
      <LoadingBar />
      <S.Form onSubmit={handleSubmit(onSubmit, onError)} autoComplete="off">
        <FormProvider {...form}>
          <AsyncInput name="email" />
          <AsyncInput name="name" />
          <AsyncInput name="surname" />
          <AsyncInput name="lastname" />
        </FormProvider>
        <S.FormFooter>
          <Button type="primary" htmlType="submit" size="large">Submit</Button>
        </S.FormFooter>
      </S.Form>
    </S.FormContainer>
  );
}

export default Form;
