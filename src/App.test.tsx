/**
 * @jest-environment jsdom
 */

// import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
});

// test('use jsdom in this test file', () => {
//   const element = document.createElement('div');
//   expect(element).not.toBeNull();
// });