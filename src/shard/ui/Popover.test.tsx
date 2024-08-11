import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Popover from './Popover';

describe('🎨 Popover 컴포넌트 테스트', () => {
  it('기본 렌더링 테스트', () => {
    render(<Popover />);
    const element = screen.getByTestId('Popover-component');
    expect(element).toBeInTheDocument();
  });
});
