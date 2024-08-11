import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Input from './Input';

describe('🎨 Input 컴포넌트 테스트', () => {
  it('기본 렌더링 테스트', () => {
    render(<Input />);
    const element = screen.getByTestId('Input-component');
    expect(element).toBeInTheDocument();
  });
});
