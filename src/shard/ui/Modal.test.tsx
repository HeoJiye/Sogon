import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Modal from './Modal';

describe('🎨 Modal 컴포넌트 테스트', () => {
  it('기본 렌더링 테스트', () => {
    render(<Modal />);
    const element = screen.getByTestId('Modal-component');
    expect(element).toBeInTheDocument();
  });
});
