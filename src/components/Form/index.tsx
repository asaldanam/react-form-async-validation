import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Input from './Input';
import { FormAsyncStateProvider } from '../../providers/formAsyncState';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import * as S from './styles';
import LoadingBar from './LoadingBar';

function Form() {
  const form = useForm();
  const onSubmit = form.handleSubmit((data) => console.log('SUBMIT', data));

  return (
    <S.FormContainer>
      <FormAsyncStateProvider>
        <LoadingBar />
        <S.Form onSubmit={onSubmit} autoComplete="off">
          <FormProvider {...form}>
            <Input name="email" />
            <Input name="name" />
            <Input name="surname" />
            <Input name="surnameCopy" />
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
