import Input from './Input';
import {screen, render, fireEvent} from '@testing-library/react'
import { describe, it ,} from "vitest";

describe('Textarea', () => {
  it('Should pass right other props', () => {
    render(<Input className={'black clover'} data-other={'other'}/>)
    const e = screen.getByRole('textbox')
    expect(e.className).match(/black clover.*/)
    expect(e.getAttribute('data-other')).toBe('other')
  })
})

