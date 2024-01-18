import { AppProvider } from '@shopify/polaris';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Stopwatch from './StopWatch';

function renderComponent(element: React.ReactElement) {
  function wrapper({ children }: { children: React.ReactNode }) {
    return <AppProvider i18n={{}}>{children}</AppProvider>;
  }

  return render(element, { wrapper });
}

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    renderComponent(<Stopwatch />);

    expect(screen.getByText('00:00:00')).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });

  test('starts and stops the stopwatch', () => {
    renderComponent(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Stop'));
    expect(screen.queryByText(/(\d{2}:){2}\d{2}/)).not.toBeInTheDocument();
  });

  test('pauses and resumes the stopwatch', () => {
    renderComponent(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Pause'));
    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    fireEvent.click(screen.getByText('Resume'));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(
      pausedTime
    );
  });

  test('records and displays lap times', () => {
    renderComponent(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list')).toContainElement(
      screen.getByText(/(\d{2}:){2}\d{2}/)
    );

    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list').children.length).toBe(2);
  });

  test('resets the stopwatch', () => {
    renderComponent(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    fireEvent.click(screen.getByText('Reset'));

    expect(screen.getByText('00:00:00')).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });
});
