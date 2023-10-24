'use client';

import React, { ReactNode, useState } from 'react';

interface AccordionSectionProps {
    index: number;
    title?: string;
    children?: ReactNode;
    isOpen: boolean;
    toggleSection: () => void;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({
  index, title = '', children, isOpen, toggleSection,
}) => (
  <div className={`govuk-accordion__section${isOpen ? ' govuk-accordion__section--expanded' : ''}`}>
    <div className="govuk-accordion__section-header">
      <h2 className="govuk-accordion__section-heading">
        <button
          type="button"
          onClick={toggleSection}
          aria-controls={`accordion-default-content-${index}`}
          className="govuk-accordion__section-button"
          aria-expanded={isOpen}
          aria-label={`${title}, ${isOpen ? 'Hide this section' : 'Show this section'}`}
        >
          <span
            className="govuk-accordion__section-heading-text"
            id={`accordion-default-heading-${index}`}
          >
            <span className="govuk-accordion__section-heading-text-focus">{title}</span>
          </span>
          <span className="govuk-visually-hidden govuk-accordion__section-heading-divider">, </span>
          <span className="govuk-accordion__section-toggle" data-nosnippet="">
            <span className="govuk-accordion__section-toggle-focus">
              <span
                className={`govuk-accordion-nav__chevron ${isOpen ? ''
                  : 'govuk-accordion-nav__chevron--down'}`}
              />
              <span className="govuk-accordion__section-toggle-text">{isOpen ? 'Hide' : 'Show'}</span>
            </span>
          </span>
        </button>
      </h2>
    </div>
    <div
      id={`accordion-default-content-${index}`}
      className="govuk-accordion__section-content"
      aria-labelledby={`accordion-default-heading-${index}`}
    >
      {children}
    </div>
  </div>
);

interface AccordionProps {
    children: ReactNode[];
}

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
  const [sectionStates, setSectionStates] = useState<boolean[]>(
    Array(React.Children.count(children)).fill(false),
  );
  const [accordionState, setAccordionState] = useState<boolean>(false);

  const toggleSection = (index: number) => {
    const newSectionStates = [...sectionStates];
    newSectionStates[index] = !newSectionStates[index];
    setSectionStates(newSectionStates);
    const allOpen = newSectionStates.every((i) => i === true);
    setAccordionState(allOpen);
  };
  const toggleAllSections = (isOpen: boolean) => {
    const newSectionStates = Array(React.Children.count(children)).fill(isOpen);
    setAccordionState(!accordionState);
    setSectionStates(newSectionStates);
  };

  return (
    <div className="govuk-accordion" data-module="govuk-accordion" id="accordion-default">
      <div className="govuk-accordion__controls">
        <button
          onClick={() => toggleAllSections(!accordionState)}
          type="button"
          className="govuk-accordion__show-all"
          aria-expanded="false"
        >
          <span
            className={`govuk-accordion-nav__chevron ${!accordionState
              ? 'govuk-accordion-nav__chevron--down'
              : ''}`}
          />
          <span
            className="govuk-accordion__show-all-text"
          >
            {`${accordionState ? 'Hide all sections' : 'Show all sections'}`}
          </span>
        </button>
      </div>
      {React.Children.map(children, (c, index) => {
        if (React.isValidElement(c) && c.type === AccordionSection) {
          return React.cloneElement(c, {
            key: index + 1,
            index,
            isOpen: sectionStates[index],
            toggleSection: () => toggleSection(index),
          } as AccordionSectionProps);
        }
        return c;
      })}
    </div>
  );
};

export default Accordion;
