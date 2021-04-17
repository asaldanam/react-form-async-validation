import regex from "../utils/regex";


export function apiCall(form): Promise<typeof response> {
	const validName = form.name?.length > 0;
	const validEmail = regex.email.test(String(form.email).toLowerCase());

	const response = {
		fields: {
			email: {
				display: true,
				disabled: false,
				error: !validEmail && 'El email introducido debe ser válido',				
			},
			name: {
				display: true,
				disabled: false,
				error: !validName && 'El campo es requerido',
			},
			surname: {
				display: true,
				disabled: false,
				error: null,
			},
			surnameCopy: {
				newValue: form.surname,
				display: form.surname,
				disabled: true,
				error: null,	
			}
		}
	};

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(response);
		}, 1000);
	});
}
