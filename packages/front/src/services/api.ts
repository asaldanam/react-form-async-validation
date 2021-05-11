import axios, { AxiosPromise } from "axios";

interface ValidateBody { 
	values: { [field: string]: any };
	touched?: { [field: string]: any };
}

export function validate(body: ValidateBody): AxiosPromise {
	const path = 'http://localhost:3001/api/users/create:validate';
	return axios.post(path, body);
}
