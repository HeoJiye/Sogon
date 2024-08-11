import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Logo from './Logo';

describe('🎨 Logo 컴포넌트 테스트', () => {
  it('기본 렌더링 테스트', () => {
    render(<Logo />);
    const element = screen.getByTestId('Logo-component');
    expect(element).toBeInTheDocument();
  });
});
