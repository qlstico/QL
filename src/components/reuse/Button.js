import React from 'react';

const Button = ({ children, callback, callbackArgs }) => {
	return <button onClick={() => callback(...callbackArgs)}>{children}</button>;
};

export default Button;
