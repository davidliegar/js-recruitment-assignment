import { render, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import DocInput from '../DocInput.vue';

describe('DocInput.vue', () => {
  it('renders with a label', () => {
    const { getByLabelText } = render(DocInput, {
      props: {
        label: 'Test Label',
        modelValue: '',
      },
    });

    const input = getByLabelText('Test Label');
    expect(input).toBeTruthy()
  });

  it('updates modelValue when input value changes', async () => {
    const { getByPlaceholderText, emitted } = render(DocInput, {
      props: {
        placeholder: 'Enter text',
        modelValue: '',
      },
    });

    const input = getByPlaceholderText('Enter text');
    await fireEvent.update(input, 'New Value');

    // Asegúrate de emitir el evento en tu componente
    expect(emitted()['update:modelValue']).toBeTruthy();
    expect(emitted()['update:modelValue'][0]).toEqual(['New Value']);
  });
});
