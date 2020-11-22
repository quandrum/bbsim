import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  const DEFAULT_PROPS = {
    onClick: jest.fn(),
  };

  beforeEach(() => {
    DEFAULT_PROPS.onClick.mockReset();
  });

  it('renders', () => {
    const { container } = render(<Button {...DEFAULT_PROPS}>test</Button>);
    expect(container.innerHTML).toMatchSnapshot();
  });
  it('calls onClick when clicked', () => {
    const text = 'test';
    render(<Button {...DEFAULT_PROPS}>{text}</Button>);
    fireEvent.click(screen.getByText(text));
    expect(DEFAULT_PROPS.onClick).toHaveBeenCalled();
  });
});
