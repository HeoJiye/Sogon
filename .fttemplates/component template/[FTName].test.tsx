import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import [FTName] from './[FTName]';

describe('🎨 [FTName] 컴포넌트 테스트', () => {
  it('기본 렌더링 테스트', () => {
    render(<[FTName] />);
    const element = screen.getByTestId('[FTName]-component');
    expect(element).toBeInTheDocument();
  });
});
