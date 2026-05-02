import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient();

describe('App', () => {
  it('renders the App component without crashing', () => {
    // The App component renders a Router, which defaults to the ComposerPage.
    // We just verify it renders successfully without throwing errors.
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    expect(screen.getByRole('heading', { name: /SPACE POSTMAN/i })).toBeInTheDocument();
  });
});
