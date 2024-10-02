import { render, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import DocButton from '../DocButton.vue'

describe('DocButton.vue', () => {
  it('renders with default props', () => {
    const { getByRole } = render(DocButton);
    const button = getByRole('button')
    expect(button.classList.contains('primary')).toBe(true);
    expect(button.classList.contains('disabled')).toBe(false);
  });

  it('renders with secondary variant', () => {
    const { getByRole } = render(DocButton, {
      props: { variant: 'secondary' }
    });
    const button = getByRole('button')
    expect(button.classList.contains('secondary')).toBe(true);
  });

  it('renders with icon', () => {
    const { getByRole, getByTestId } = render(DocButton, {
      props: { icon: 'mdi-home' }
    });
    const button = getByRole('button')
    const icon = getByTestId('icon')
    expect(button.classList.contains('with-icon')).toBe(true);
    expect(icon).toBeTruthy();
  });

  it('disables the button when disabled prop is true', () => {
    const { getByRole } = render(DocButton, {
      props: { disabled: true }
    });
    const button = getByRole('button')
    expect(button.classList.contains('disabled')).toBe(true);
  });

  it('emits click event when clicked', async () => {
    const { getByRole, emitted } = render(DocButton);
    const button = getByRole('button');
    await fireEvent.click(button);
    expect(emitted()).toHaveProperty('on-click');
  });
});
