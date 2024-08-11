import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Button from './Button';

describe('🎨 Button 컴포넌트 테스트', () => {
  it('기본 렌더링 테스트', () => {
    render(<Button />);
    const element = screen.getByTestId('Button-component');
    expect(element).toBeInTheDocument();
  });
});
