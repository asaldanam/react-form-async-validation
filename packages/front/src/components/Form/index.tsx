import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Input from './Input';
import { FormAsyncStateProvider, useFormAsyncContext } from '../../providers/formAsyncState';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import * as S from './styles';
import LoadingBar from './LoadingBar';

const FormInitializer = () => {
  const { triggerCheck } = useFormAsyncContext();

  useEffect(() => {
    triggerCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}

function Form() {
  const form = useForm();
  const onSubmit = form.handleSubmit((data) => console.log('SUBMIT', data));

  return (
    <S.FormContainer>
      <FormAsyncStateProvider>

        <LoadingBar />

        <S.Form onSubmit={onSubmit} autoComplete="off">
          <FormProvider {...form}>
            <FormInitializer />
            <Input name="email" />
            <Input name="name" />
            <Input name="surname" />
            <Input name="lastname" />
          </FormProvider>

          <S.FormFooter>
            <Button type="primary" size="large">Submit</Button>
          </S.FormFooter>
        </S.Form>

      </FormAsyncStateProvider>
    </S.FormContainer>
  );
}

export default Form;
