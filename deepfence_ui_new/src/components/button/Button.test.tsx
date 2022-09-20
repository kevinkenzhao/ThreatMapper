import '@testing-library/jest-dom';

import { fireEvent } from '@testing-library/react';
import { FaPlus } from 'react-icons/fa';
import { describe, expect, it, vi } from 'vitest';

import { renderUI } from '../../tests/utils';
import Button from './Button';

describe(`Component Button`, () => {
  it(`render with label, color, startIcon, endIcon, onClick`, () => {
    const onClick = vi.fn();
    const { getByTestId, getByRole, getByText } = renderUI(
      <Button
        id="id"
        color="primary"
        startIcon={<FaPlus />}
        endIcon={<FaPlus />}
        onClick={onClick}
      >
        Test button
      </Button>,
    );
    const buttonId = getByTestId('button-id');
    const startIconId = getByTestId('button-icon-start-id');
    const endIconId = getByTestId('button-icon-end-id');
    expect(getByText('Test button')).toBeInTheDocument();
    expect(buttonId).toHaveClass('bg-blue-600');
    expect(startIconId).toBeInTheDocument();
    expect(endIconId).toBeInTheDocument();

    // action
    const button = getByRole('button', {
      name: 'Test button',
    });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
