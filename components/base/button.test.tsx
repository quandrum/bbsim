import { render, screen, fireEvent } from '@testing-library/react';
import Button from './button';

describe('Button', () => {
  const DEFAULT_PROPS = {
    onClick: jest.fn(),
    text: 'test',
  };

  beforeEach(DEFAULT_PROPS.onClick.mockReset);

  it('renders', () => {
    const { container } = render(<Button {...DEFAULT_PROPS} />);
    expect(container.innerHTML).toMatchSnapshot();
  });
  it('calls onClick when clicked', () => {
    render(<Button {...DEFAULT_PROPS} />);
    fireEvent.click(screen.getByText(DEFAULT_PROPS.text));
    expect(DEFAULT_PROPS.onClick).toHaveBeenCalled();
  });
});
