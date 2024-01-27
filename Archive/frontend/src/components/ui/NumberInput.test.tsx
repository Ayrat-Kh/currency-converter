import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { NumberInput } from './NumberInput';

describe('NumberInput', () => {
  it('Should have only 2 digits', () => {
    const handleChangeMock = vi.fn();

    render(
      <NumberInput label="Number" value={23.5} onChange={handleChangeMock} />,
    );

    fireEvent.change(screen.getByLabelText('Number'), {
      target: {
        value: '23.234',
      },
    });

    expect(handleChangeMock).toHaveBeenCalledWith(23.23);
  });
});
