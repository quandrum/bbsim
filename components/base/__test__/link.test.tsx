import { render, screen, fireEvent } from '@testing-library/react';
import { Link } from '../link';

describe('Link', () => {
  const DEFAULT_PROPS = {
    onClick: jest.fn(),
  };

  beforeEach(() => {
    DEFAULT_PROPS.onClick.mockReset();
  });

  it('renders', () => {
    const { container } = render(<Link {...DEFAULT_PROPS}>test</Link>);
    expect(container.innerHTML).toMatchSnapshot();
  });
  it('calls onClick when clicked', () => {
    const text = 'test';
    render(<Link {...DEFAULT_PROPS}>{text}</Link>);
    fireEvent.click(screen.getByText(text));
    expect(DEFAULT_PROPS.onClick).toHaveBeenCalled();
  });
});
