import React from 'react';
import { screen, render } from '@testing-library/react';
import { Tag, TagGroup } from '@/components/Tag';

describe('Tag Component', () => {
  test('renders with default color', () => {
    render(<Tag text="Test Text" />);
    const tagElement = screen.getByText(/Test Text/i);
    expect(tagElement).toHaveClass('govuk-tag--blue');
  });

  test('renders with specified color', () => {
    render(<Tag text="Test Text" colour="green" />);
    const tagElement = screen.getByText(/Test Text/i);
    expect(tagElement).toHaveClass('govuk-tag--green');
  });
});

describe('TagGroup Component', () => {
  test('renders No tags message when no tags provided', () => {
    render(<TagGroup frontmatter={{}} />);
    const noTagsElement = screen.getByText(/No tags/i);
    expect(noTagsElement).toBeInTheDocument();
  });

  test('renders tags correctly', () => {
    render(
      <TagGroup
        tags="priority:red,complexity:green,value:blue"
        frontmatter={{
          title: 'Kitchen sink',
          description: 'All the components in one place',
          priority: 'Now',
          value: 'High value',
          complexity: 'High complexity',
          product: 'Leavers',
          tags: [
            'High value',
            'High priority',
          ],
          breadcrumbs: [
            'Home, /',
            'Documentation, /documentation/',
          ],
        }}
      />,
    );

    const tag1Element = screen.getByText(/Now/i);
    const tag2Element = screen.getByText(/High complexity/i);
    const tag3Element = screen.getByText(/Value/i);
    expect(tag1Element).toBeInTheDocument();
    expect(tag1Element).toHaveClass('govuk-tag--red');
    expect(tag2Element).toBeInTheDocument();
    expect(tag2Element).toHaveClass('govuk-tag--green');
    expect(tag3Element).toBeInTheDocument();
    expect(tag3Element).toHaveClass('govuk-tag--blue');
  });
});
