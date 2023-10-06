import React from 'react';
import { render, screen } from '@testing-library/react';
import Dialog from '../../components/atoms/Dialog';

describe('Dialog', () => {
  it('should render children when open is true', () => {
    render(
      <Dialog open={true}>
        <div>Test Content</div>
      </Dialog>
    );

    const content = screen.getByText('Test Content');
    expect(content).toBeInTheDocument();
  });

  it('should not render children when open is false', () => {
    render(
      <Dialog open={false}>
        <div>Test Content</div>
      </Dialog>
    );

    const content = screen.queryByText('Test Content');
    expect(content).not.toBeInTheDocument();
  });

  it('should set overflow:hidden on the body when open is true', () => {
    render(
      <Dialog open={true}>
        <div>Test Content</div>
      </Dialog>
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should set overflow:unset on the body when open is false', () => {
    render(
      <Dialog open={false}>
        <div>Test Content</div>
      </Dialog>
    );

    expect(document.body.style.overflow).toBe('unset');
  });
});
