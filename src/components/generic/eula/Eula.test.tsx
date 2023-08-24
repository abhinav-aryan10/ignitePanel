import { render, screen, cleanup } from '@testing-library/react';
// Importing the jest testing library
import '@testing-library/jest-dom';
import Eula from './Eula';
import React from 'react';

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe('Back Button', () => {
  render(<Eula />);
  const btn = screen.getByTestId('back');

  test('Button Rendering', () => {
    expect(btn).toBeInTheDocument();
  });

  // Test 2
  test('Button Text', () => {
    expect(btn).toHaveTextContent('Back');
  });
});

describe('Decline Button', () => {
  render(<Eula />);
  const btn = screen.getByTestId('decline');

  test('Button Rendering', () => {
    expect(btn).toBeInTheDocument();
  });

  // Test 2
  test('Button Text', () => {
    expect(btn).toHaveTextContent('Decline');
  });
});

describe('Accept Button', () => {
  render(<Eula />);
  const btn = screen.getByTestId('accept');

  test('Button Rendering', () => {
    expect(btn).toBeInTheDocument();
  });

  // Test 2
  test('Button Text', () => {
    expect(btn).toHaveTextContent('Accept');
  });
});
