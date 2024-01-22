# Cormick Holland's Stopwatch

## Description

This is a simple stopwatch application that I built using React for the Shopify Engineering Intern Assessment.

## Functionality

The stopwatch has the following functionality:
- Start/stop buttons that resume and pause the timer
- Reset button that resets the timer to 0
- Lap button that records the current time and adds it to a list of recorded times

## Code Quality Assurance

This project uses [Shopify's open source web configs](https://github.com/Shopify/web-configs) for Prettier, ESLint, and Typescript.
This ensures it is formatted and linted correctly, and helps it look like other Shopify codebases.
The file hierachy was also modified to a more organized structure, separated into a `hooks` folder for custom hooks, and a `components` folder for React components.

## Testing

For testing, [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) are used.
The test suite guarantees trivial functionality, such as the timer starting and stopping correctly, and the lap button recording the correct time.
It also checks for potential regressions that I ran into while building the stopwatch, such as the timer silently incrementing while paused.

## Documentation

JSDoc annotations are used to document the codebase, with more detailed descriptions for complex functions, such as `useStopwatch`.

## Design Choices

- `useStopwatch`
  - A custom hook was used to modularize the stopwatch internal logic, to keep the stopwatch component clean and simple.
  - This allows the hook to be used elsewhere in the application if needed, and makes version control much easier to navigate.
- `performance` API
  - The `performance` API was used to track the time, as it is more precise than `Date.now()`.
  - The call to `performance.now()` is abstracted into a `getCheckpoint` function, so if the component is being used in an environment where `performance` is not available, it can be easily swapped out for `Date.now()`.
- Tailwind CSS
  - Tailwind CSS was used to style the application, as it is a simple and easy-to-use CSS framework.
  - It also skips any bundle size pitfalls of CSS-in-JS solutions, and makes prefers-color-scheme handling trivial.

### Easter Egg

[Here's an implementation of the stopwatch in Svelte, because I like Svelte.](https://svelte-5-preview.vercel.app/#H4sIAAAAAAAAE51YW2_bNhT-K5ybITJqy07aZZ3tBNuKPgxoi2LtW10gtERbTChSIKk4hqD_vsOLKMl2UmdpEUfkOd-5X-RqsKaMqMHsezXgOCeD2eCvohiMBnpXmAf1QJgm8KxEKRNzslCJpIW-WfKlpnkhpEZftSi2WCcZWkuRo-UgnoSj2CEsB_MOQ4UU0WXxDVO2pTxFdcvYu4jvlGME1skEcaHJDK1IgktFkM6oQuY_RxhJUjC0EyXK6SbTKMMPQCBQju8Johqu15Io0E9Ij6Ub2UC1FfIeFVIURLLdCN2VSiOcpgCrCpwQpEROthmRBGFgoPqcMUBclZSlBq2ncjQEfReT1kl80bpnAgfgy1ykdE1JOphpWZJ6FFwfKE8IAGKYb66XAw0uuun51hjdyuz4tnfhAxNcfBDMv0utBT8SUncRAmt4LT_XRK6Nv77RnMgv4E-FKnurc8oYVSQRPFUzxMt8RaQVWh9yf8TFR6p0j5_hAvjg5vuPPtu65ImmRk0hc6w_W-QIBDRShg2EhChJDuZJyjeGYhgXOP2qsdTR5QidT8-Hz0J_6pgQHbMnSIJTSKAM4qXQdV-xT1hn8ZoJIXsQaILeXE3Nz9Ap0YDklJeaPAfTx_k14ADk1RHAhvB0wKsG7uIQLSFc05dDXgTEgNeL0e1ZZb1Xz84q7wHzpweo47OqK7i-dXFDrk94O0P-X_fr4bA-q1eK06Ig2uVtBAXUVbeedfJ5aLNjkdIHlDCslKk_8qjHV48MrOd6nAsOXWc1fofs-Ubi3fj36RSlWN7P2qM306mv2qWufpJfXuYEhAJHNfHa1n3dfdWA9qZWjNbdOjqid67H74IOi-yyb9BlY9BKsNQY9LZj0LtDgy47Bi01iLZOUx59kl02gkoWBK2ETIlE7iP4xSF3D43_pCh5SlJUjN925FSvCIYQW4sxNAtE09Fe9FBEU2e9-7dgtG-pFXF1aNFbOAK7LwFd6Rn81RiI_E9FU_DyadFzHIsJo63uM8IU-Z-aBR844M_C-UCCTGnctCO6ve-LnRiX1U1gSnbzdHb18mXNyCMyv8aJYC4ZTBVCAKkmuWoezPCk613zmI2h0gjhaLVxyl-ECPuDP4I1h2XlQNpK-VMSblLmWKHO2pqP-ynQhH-xN8Ealwj-L1FlTq6rFkHak7ol-WJ2ji5FYQ7qHgbRexBEdwigKLrXEDB_Odk3r1_LXcNcbQ9RryU0n89tFsdGf7tk3KnughEG34bo9xlJ7gsB0zmy8w0h36NhV7KZzxMSc7G1bdUmDXm0a0QA2eu-DoQR3a_Ta3SmNNYkmhogR0CVdXraXhqj2nvrjHD3_YebJeYGYgcXU7s5Otok2AEXe3YFwEKSBypK9YVIKqxSU798npH1miQ6Av2vb5o5T9fQXLyOQ-8XT9-MIbvVPGAGUJAM__inFsaVr6MtrNRD9dC4o_28Kes973nm1_s2zJ2MemSGbVDOx9CpkTCCZVCt0dgvQ0PvQ8_hLd_shS8Ku0_A7l67q3rUMpvQHWEyx_OW2mjuCnGG9lxmfP_LEed7h_4s2haiTa81hlYcXOU-bX0flfu02BfF0fHs59zrJpbH9DT5v6em7TIHah7PZK_lKc7ZS6_pvIlUW1qO0Beh3cu7esH5gVaGNi5KlUUh8FBF6QzdmoXhrLL3jPCNziCTL-rbUUvWb_U99cam3gNpPdzTtUvbS656blvWSS9kbmKc8Fpme7nvgaanNMNlfnBuo3p4bOfI4TF4aP7k4vpV7xhJnY5R0Vn4Vp1BZzQ3W5c7Gvg25cdt8QgbXgF7XBjUv8GgtkN4m8GAbxawhq-K49gKsnKaAWZPYEitCPMTykk7YbOwb9pjo0V_g_DDP8zGnqkVOCZhNLmfBT-PkBU_g1dW-263HDQLwAkQNiQdBPv8IgQbvQ6CfX4RAgS6ww9PDfcpY773VcRT8z18USD4J4iqbr8i6H5XczDI977mcM3bQ0RY7XjS1rvJBrzFVCNOtgheQXKowCiCZiXYA3hYkjsYp13q8OIGFZuKBCLJdQyrI4z2D4yYp-jc5b5_Tw9FHoNif2l4rYdcI0Akk_MR2JJpDbvTZJKkPG6-7EmUihORLwedHhHjNP3wAPhm5SIc9spzJnB6bpS02j5PS6QU8jxY1FMt2LES6S7GkP08fZ9RlkaqAa07c_ZoL_pR_weoU9c3oxMAAA==)
