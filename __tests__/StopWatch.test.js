import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Stopwatch from '../src/components/StopWatch';
import '@testing-library/jest-dom';
import { AppProvider } from '@shopify/polaris';

describe('Stopwatch', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('renders initial state', () => {
    render(
      <AppProvider i18n={{}}>
        <Stopwatch />
      </AppProvider>
    );

    expect(screen.getByText('00:00:00.000')).toBeInTheDocument();
    expect(screen.queryByTestId('stopwatch-control').children.length).toBe(3);
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });
});
