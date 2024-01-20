// __mocks__/framer-motion.ts
import * as React from "react";
const actual = jest.requireActual("framer-motion");

module.exports = {
	...actual,
	motion: {
		div: ({ children }: { children: React.ReactNode }) => (
			<div>{children}</div>
		),
		// Add other HTML tags or custom components as needed
	},
	AnimatePresence: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
};
