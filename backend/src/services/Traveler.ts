/* eslint-disable max-len */
import regex from "src/utils/regex";

interface IField {
  value?: any,
  hidden?: boolean,
  disabled?: true,
  error?: string | null,	
}

export class Traveler {

  public validateUser({values, touched}) {
    const validName = values.name?.length > 0;
    const validSurname = values.surname?.length > 0;
    const validEmail = regex.email.test(String(values.email).toLowerCase());

    const validation = {
      fields: {
        email: {
          disabled: false,
          error: touched.email && !validEmail && 'El email introducido debe ser válido',				
        },
        name: {
          disabled: false,
          error: touched.name && !validName && 'El campo es requerido',
        },
        surname: {
          disabled: false,
          error: touched.name && !validSurname && 'El campo es requerido',
        }
      }
    }
    return validation;
  }
}
