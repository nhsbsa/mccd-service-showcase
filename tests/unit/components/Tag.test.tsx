import React from 'react';
import { screen, render } from '@testing-library/react';
import { Tag, TagList } from '@/components/Tag';
import testTheme from '../../data/theme.config';

describe('Tag Component', () => {
  test('renders with default color', () => {
    render(<Tag text="Test Text" />);
    const tagElement = screen.getByText(/Test Text/i);
    expect(tagElement).toHaveClass('govuk-tag--grey');
  });

  test('renders with specified color', () => {
    render(<Tag text="Test Text" colour="green" />);
    const tagElement = screen.getByText(/Test Text/i);
    expect(tagElement).toHaveClass('govuk-tag--green');
  });
});

describe('TagList Component', () => {
  jest.mock('../../../public/theme/theme.config', () => ({
    __esModule: true,
    default: testTheme,
  }));
  test('renders tags from frontmatter', () => {
    const frontmatter = {
      title: 'Data Test',
      tags: ['Medium priority', 'High value'],
    };

    render(<TagList frontmatter={frontmatter} />);

    expect(screen.getByText('Medium priority')).toBeInTheDocument();
    expect(screen.getByText('High value')).toBeInTheDocument();

    // Check the class of the rendered Tag components
    expect(screen.getByText('Medium priority')).toHaveClass('govuk-tag--yellow');
    expect(screen.getByText('High value')).toHaveClass('govuk-tag--green');
  });

  test('does not crash and renders default colour when tag value does not exist in theme.config.js', () => {
    render(<TagList tags="Nonexistent:invalid" />);

    // Ensure the component does not crash
    expect(screen.getByText('Nonexistent')).toBeInTheDocument();
    expect(screen.getByText('Nonexistent')).toHaveClass('govuk-tag--grey');
  });

  test('renders tags from property tags', () => {
    render(<TagList tags="High Importance:red,Low Importance:blue,Wrong:greenish" />);

    expect(screen.getByText('High Importance')).toBeInTheDocument();
    expect(screen.getByText('Low Importance')).toBeInTheDocument();
    expect(screen.getByText('Wrong')).toBeInTheDocument();

    // Check the class of the rendered Tag components
    expect(screen.getByText('High Importance')).toHaveClass('govuk-tag--red');
    expect(screen.getByText('Low Importance')).toHaveClass('govuk-tag--blue');
    expect(screen.getByText('Wrong')).toHaveClass('govuk-tag--grey');
  });

  test('renders child components', () => {
    render(
      <TagList>
        <Tag text="Tag component" colour="Purple" />
      </TagList>,
    );

    expect(screen.getByText('Tag component')).toBeInTheDocument();
    expect(screen.getByText('Tag component')).toHaveClass('govuk-tag--purple');
  });

  test('renders "No tags" when no tags provided', () => {
    render(<TagList />);

    expect(screen.getByText('No tags')).toBeInTheDocument();
  });
});
