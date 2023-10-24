import { render, screen, fireEvent } from '@testing-library/react';
import BackLink from '@/components/BackLink';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('BackLink Component', () => {
  test('renders BackLink with default title', () => {
    render(<BackLink />);
    const linkElement = screen.getByRole('link', { name: 'Back' });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders BackLink with custom title', () => {
    render(<BackLink title="Go Back" />);
    const linkElement = screen.getByRole('link', { name: 'Go Back' });
    expect(linkElement).toBeInTheDocument();
  });

  test('calls router.push when href is provided and link is clicked', () => {
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<BackLink href="/some-path" />);
    const linkElement = screen.getByRole('link', { name: 'Back' });

    fireEvent.click(linkElement);

    expect(mockRouter.push).toHaveBeenCalledWith('/some-path');
  });

  test('calls router.back when href is not provided and link is clicked', () => {
    const backMock = { back: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(backMock);

    render(<BackLink />);
    const linkElement = screen.getByRole('link', { name: 'Back' });

    fireEvent.click(linkElement);

    expect(backMock.back).toHaveBeenCalled();
  });

  test('calls router.push when Enter key is pressed and href is provided', () => {
    const pushMock = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(pushMock);

    render(<BackLink href="/some-path" />);
    const linkElement = screen.getByRole('link', { name: 'Back' });

    fireEvent.keyDown(linkElement, { key: 'Enter' });

    expect(pushMock.push).toHaveBeenCalledWith('/some-path');
  });

  test('calls router.back when Enter key is pressed and href is not provided', () => {
    const backMock = { back: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(backMock);

    render(<BackLink />);
    const linkElement = screen.getByRole('link', { name: 'Back' });

    fireEvent.keyDown(linkElement, { key: 'Enter' });

    expect(backMock.back).toHaveBeenCalled();
  });

  test('ignores router.back when key other than Enter is pressed and href is not provided', () => {
    const backMock = { back: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(backMock);

    render(<BackLink />);
    const linkElement = screen.getByRole('link', { name: 'Back' });

    fireEvent.keyDown(linkElement, { key: 'S' });

    expect(backMock.back).not.toHaveBeenCalled();
  });

  test('ignores router.push when key other than Enter is pressed and href is provided', () => {
    const pushMock = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(pushMock);

    render(<BackLink href="/some-path" />);
    const linkElement = screen.getByRole('link', { name: 'Back' });

    fireEvent.keyDown(linkElement, { key: 'S' });

    expect(pushMock.push).not.toHaveBeenCalledWith('/some-path');
    expect(pushMock.push).not.toHaveBeenCalled();
  });
});
