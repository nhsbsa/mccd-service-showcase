import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tabs, TabPanel } from '@/components/Tabs';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const TestComponent = () => (
  <Tabs title="Test Tabs">
    <TabPanel title="Tab 1" id="" selected="false">
      <p>Content for Tab 1</p>
    </TabPanel>
    <TabPanel title="Tab 2" id="" selected="false">
      <p>Content for Tab 2</p>
    </TabPanel>
  </Tabs>
);

describe('Tabs Component', () => {
  it('renders without crashing', () => {
    render(<TestComponent />);
  });

  it('displays the correct initial tab content', () => {
    render(<TestComponent />);
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
  });

  it('changes tab content when clicking on a tab header', async () => {
    render(
      <Tabs title="Test Tabs">
        <TabPanel title="Tab 1" id="" selected="false">
          <p>Content for Tab 1</p>
        </TabPanel>
        <TabPanel title="Tab 2" id="" selected="false">
          <p>Content for Tab 2</p>
        </TabPanel>
      </Tabs>,
    );
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    const tabLink = screen.getByRole('tab', { name: 'Tab 2' });
    expect(tabLink).toBeInTheDocument();
    await userEvent.click(tabLink);
    expect(tabLink).toHaveAttribute('aria-selected', 'true');
  });
});
