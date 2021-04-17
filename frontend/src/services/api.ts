import regex from "../utils/regex";


export function apiCall(form): Promise<typeof response> {
	const validName = form.name?.length > 0;
	const validEmail = regex.email.test(String(form.email).toLowerCase());

	const response = {
		fields: {
			email: {
				disabled: false,
				error: !validEmail && 'El email introducido debe ser válido',				
			},
			name: {
				disabled: false,
				error: !validName && 'El campo es requerido',
			},
			surname: {
				disabled: false,
				error: null,
			},
			surnameCopy: {
				newValue: form.surname,
				hidden: !form.surname,
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
