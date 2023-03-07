import React, { createContext, Dispatch, useContext, useEffect, useMemo, useReducer } from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as Api from '../services/api';

type InitialStateType = {
	loading: boolean;
	fields: {
		error?: string | null;
		display?: boolean;
		disabled?: boolean;
	};
}

type ContextType = {
	formAsyncState: InitialStateType;
	dispatch: Dispatch<{ type: string, payload?: any }>;
}

const initialState = {
	loading: false,
	fields: {}
}

export const FormAsyncStateContext = createContext<ContextType>({
	formAsyncState: initialState,
	dispatch: () => null
});

const reducer = (state: InitialStateType, action) => {
	switch (action.type) {
		case 'setLoading':
			return {
				...state,
				loading: action.payload,
			}
		case 'fullFilled':
			return {
				...state,
				...action.payload,
				loading: false,
			}
		default:
			return state;
	}
}

export const FormAsyncStateProvider: React.FC = ({ children }) => {
	const [formAsyncState, dispatch] = useReducer(reducer, initialState);
	const value = useMemo(() => ({ formAsyncState, dispatch }), [formAsyncState])

	return (
		<FormAsyncStateContext.Provider value={value}>
			{children}
		</FormAsyncStateContext.Provider>
	)
}

export function useFormAsyncContext(form: UseFormReturn, name?: string) {
	const { getValues, setValue } = form;
	const { formAsyncState, dispatch } = useContext(FormAsyncStateContext);

	// Obtiene el estado del campo 
	const fields = formAsyncState?.fields || {};
	const asyncState = fields[name || ''] || {};

	// Actualiza el valor del campo en caso de que la API lo provea
	const { newValue } = asyncState;
	useEffect(() => {
		if (!newValue || !name) return;
		setValue(name, newValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newValue])

	/** Realiza un check del estado contra la API */
	const triggerCheck = () => {
		dispatch({ type: 'setLoading', payload: true });

		const values = getValues();
		Api.validate({ values }).then(res => {
			const payload = res.data;
			dispatch({ type: 'fullFilled', payload });
		})
	};

	return { asyncState, formAsyncState, triggerCheck };
}
