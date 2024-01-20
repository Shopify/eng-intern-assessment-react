import * as React from "react";
const actual = jest.requireActual("framer-motion");

// This file is used to mock the framer-motion library for testing purposes
module.exports = {
	...actual,
	motion: {
		div: ({ children }: { children: React.ReactNode }) => (
			<div>{children}</div>
		),
	},
	AnimatePresence: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
};
