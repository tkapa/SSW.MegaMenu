import React from 'react';
import App from './App';
import { render, screen } from './tests/test-utils';

import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('uses flexbox in app header', () => {
    render(<App />);
    const element = screen.getByRole('banner');
    expect(element.className).toEqual('App-header');
    expect(getComputedStyle(element).display).toEqual('flex');
  });

  it("app header title is 'Test MegaMenu'", () => {
    render(<App />);
    const element = screen.getByRole('banner');
    expect(element.textContent).toEqual('Test MegaMenu');
  });
});
