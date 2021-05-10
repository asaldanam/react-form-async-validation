import axios from "axios";


export function validateTraveler(body: { 
	values: { [field: string]: any };
	touched?: { [field: string]: any };
}) {
	const path = 'http://localhost:3001/api/users/create:validate';
	return axios.post(path, body, {
		headers: {
			'Access-Control-Allow-Origin': '*',
		}
	});
}

// import regex from "../utils/regex";

// export function apiCall(form): Promise<typeof response> {
// 	const validName = form.name?.length > 0;
// 	const validEmail = regex.email.test(String(form.email).toLowerCase());

// 	const response = {
// 		fields: {
// 			email: {
// 				disabled: false,
// 				error: !validEmail && 'El email introducido debe ser válido',				
// 			},
// 			name: {
// 				disabled: false,
// 				error: !validName && 'El campo es requerido',
// 			},
// 			surname: {
// 				disabled: false,
// 				error: null,
// 			},
// 		}
// 	};

// 	return new Promise((resolve) => {
// 		setTimeout(() => {
// 			resolve(response);
// 		}, 1000);
// 	});
// }

