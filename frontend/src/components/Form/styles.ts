/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { Typography } from 'antd';
const { Text, Link } = Typography;

export const FormContainer = styled.div`
	display: flex;
	justify-content: center;
	padding-top: 3rem;
`;

export const Form = styled.form`
	width: 100%;
	max-width: 24rem;
`;

export const FormFooter = styled.footer`
	display: flex;
	justify-content: flex-end;
	margin-top: 2rem;

	button {
		width: 100%;
	}
`;

export const ErrorHint = styled.p`
	font-size: 12px;
	color: red;
	/* height: 1rem; */
`;

export const ProgressBar = styled.div`
	width: 100%;
	position: fixed;
	top: 0;
	overflow-y: hidden;
	height: 6px;
	opacity: 1;
	transition: opacity .15s linear;

	.ant-progress-text {
		display: none;
	}
	.ant-progress-outer {
		padding: 0;
	}
	.ant-progress-inner {
		border-radius: 0;
	}
	.ant-progress-bg {
		height: 24px !important;
		border-radius: 0;
	}
	.ant-progress-bg::before {
		animation-duration: 0.75s;
		background: black;
	}
`;
