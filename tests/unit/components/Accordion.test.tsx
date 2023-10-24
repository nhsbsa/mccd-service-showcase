import {
  render, screen, fireEvent,
} from '@testing-library/react';
import { Accordion, AccordionSection } from '@/components/Accordion';

describe('Accordion Component', () => {
  test('renders Accordion component with sections', () => {
    render(
      <Accordion>
        <AccordionSection title="Section 1">Content 1</AccordionSection>
        <AccordionSection title="Section 2">Content 2</AccordionSection>
      </Accordion>,
    );

    expect(screen.getByText('Section 1', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('Section 2', { exact: true })).toBeInTheDocument();
  });

  test('toggles section visibility when clicked', async () => {
    render(
      <Accordion>
        <AccordionSection title="Section 1">Content 1</AccordionSection>
      </Accordion>,
    );

    const sectionButton = screen.getByTestId('section-button', { });
    const sectionContainer = screen.getByTestId('section', { });

    expect(sectionContainer).not.toHaveClass('govuk-accordion__section--expanded');

    fireEvent.click(sectionButton);

    expect(sectionContainer).toHaveClass('govuk-accordion__section--expanded');
  });
  test('toggles visibility of all sections when clicked', () => {
    render(
      <Accordion>
        <AccordionSection title="Section 1">Content 1</AccordionSection>
        <AccordionSection title="Section 2">Content 2</AccordionSection>
        <AccordionSection title="Section 3">Content 1</AccordionSection>
        <AccordionSection title="Section 4">Content 2</AccordionSection>
      </Accordion>,
    );

    const allSections = screen.getAllByTestId('section', { });
    const toggleAllSections = screen.getByTestId('toggleAllSections', { });

    fireEvent.click(toggleAllSections);

    allSections.forEach((section) => {
      expect(section).toHaveClass('govuk-accordion__section--expanded');
    });

    fireEvent.click(toggleAllSections);

    allSections.forEach((section) => {
      expect(section).not.toHaveClass('govuk-accordion__section--expanded');
    });
  });
});
