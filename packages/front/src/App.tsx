import Form from './components/Form';
import React from 'react';
import { FormAsyncStateProvider } from './providers/formAsyncState';

function App() {
  return (
    <>
      <FormAsyncStateProvider>
        <Form />
      </FormAsyncStateProvider>
    </>
  );
}

export default App;
