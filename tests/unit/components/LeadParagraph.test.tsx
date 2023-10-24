import React from 'react';
import { render, screen } from '@testing-library/react';
import LeadParagraph from '@/components/LeadParagraph';
import { Paragraph } from '@/components/MdxComponents';

describe('LeadParagraph component', () => {
  it('renders a single paragraph when no Paragraph component is found', () => {
    const testText = 'This is some test content.';
    render(<LeadParagraph>{testText}</LeadParagraph>);

    const paragraphElement = screen.getByText(testText, {});

    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement).toHaveClass('govuk-body-l');
  });

  it('renders multiple paragraphs when Paragraph components are found', () => {
    const child1 = <Paragraph>Paragraph 1</Paragraph>;
    const child2 = 'Text content';
    const child3 = <Paragraph>Paragraph 2</Paragraph>;

    render(
      <LeadParagraph>
        {child1}
        {child2}
        {child3}
      </LeadParagraph>,
    );

    const paragraph1Element = screen.getByText('Paragraph 1', {});
    const paragraph2Element = screen.getByText('Paragraph 2', {});

    expect(paragraph1Element).toBeInTheDocument();
    expect(paragraph1Element).toHaveClass('govuk-body-l');

    expect(paragraph2Element).toBeInTheDocument();
    expect(paragraph2Element).toHaveClass('govuk-body-l');
  });

  it('renders non-Paragraph children as a single paragraph', () => {
    const child1 = 'Text content';
    const child2 = <span>Some div content</span>;

    render(
      <LeadParagraph>
        {child1}
        {child2}
      </LeadParagraph>,
    );

    const paragraphElement = screen.getByText('Text content', {});

    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement).toHaveClass('govuk-body-l');
  });
});
