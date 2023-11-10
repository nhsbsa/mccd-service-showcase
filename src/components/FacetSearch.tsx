'use client';

import React, { useEffect, useRef, useState } from 'react';
import { camelCase, startCase } from 'lodash';
import Link from 'next/link';
import {
  filterExpanderDown,
  filterExpanderUp,
  selectIconDown,
  selectIconUp,
} from '@/lib/svg/search-component';

import { filterData } from '@/lib/helpers/data';
import { DataType } from '@/types';

type TFacetSearch = {
  data?: DataType;
  facets?: string | string[];
  searchType?: string;
  titleField?: string
  descriptionField?: string
  urlField?: string
}

type TFacetListItem = {
  id: string;
  item: string;
  // eslint-disable-next-line no-unused-vars
  handleCheckboxChange: (id: string) => void;
  searchQuery: string[];
}

type TFacetSidebar = {
  name: string;
  facetSections: boolean[];
  index: number;
  // eslint-disable-next-line no-unused-vars
  toggleSection: (index: number) => void;
  value: string[];
  // eslint-disable-next-line no-unused-vars
  handleCheckboxChange: (id: string) => void;
  searchQuery: string[];
}

type TSearchResult = {
  title: string;
  url: string;
  description: string;

  [key: string]: string | number;
}

const FacetListItem: React.FC<TFacetListItem> = ({
  id,
  item,
  handleCheckboxChange,
  searchQuery,
}) => (
  <li className="govuk-checkboxes__item" key={id}>
    <input
      type="checkbox"
      name={item}
      id={id}
      value={item}
      onChange={() => handleCheckboxChange(id)}
      checked={searchQuery.includes(id)}
      className="govuk-checkboxes__input"
      aria-controls="js-search-results-info"
    />
    <label htmlFor={id} className="govuk-label govuk-checkboxes__label">
      {startCase(item)}
    </label>
  </li>
);

const FacetSidebarSection: React.FC<TFacetSidebar> = ({
  name,
  facetSections,
  index,
  toggleSection,
  value,
  handleCheckboxChange,
  searchQuery,
}) => (
  <div
    id={name}
    data-testid="facet-section"
    className={`app-c-option-select js-collapsible ${
      facetSections[index] ? 'js-open' : 'js-closed'
    }`}
  >
    <h3 className="app-c-option-select__heading js-container-heading">
      <button
        className="js-container-button app-c-option-select__title app-c-option-select__button"
        type="button"
        role="button"
        id={`option-select-title-${name}`}
        aria-controls={name}
        onClick={() => toggleSection(index)}
        aria-expanded={facetSections[index]}
      >
        {startCase(name)}
      </button>
      {selectIconUp}
      {selectIconDown}
    </h3>
    <div
      role="group"
      aria-labelledby={`option-select-title-${name}`}
      className="app-c-option-select__container js-options-container"
      id={name}
      tabIndex={-1}
    >
      <div className="app-c-option-select__container-inner js-auto-height-inner">
        <div
          id={`checkboxes-${name}`}
          className="gem-c-checkboxes govuk-form-group govuk-checkboxes--small"
        >
          <fieldset className="govuk-fieldset">
            <legend
              className="govuk-fieldset__legend govuk-fieldset__legend--m
              gem-c-checkboxes__legend--hidden"
            >
              {startCase(name)}
            </legend>
            <ul className="govuk-checkboxes gem-c-checkboxes__list">
              {value.map((item: string) => {
                const id = `${name}:${item}`;
                return (
                  <FacetListItem
                    key={id}
                    id={id}
                    item={item}
                    handleCheckboxChange={handleCheckboxChange}
                    searchQuery={searchQuery}
                  />
                );
              })}
            </ul>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
);
type FacetMapType = {
  [key: string]: string[];
};

const FacetSearch: React.FC<TFacetSearch> = ({
  data,
  facets: initialFacets,
  searchType = 'artefacts',
  titleField = 'title',
  descriptionField = 'description',
  urlField = 'url',
}) => {
  const [searchResults, setSearchResults] = useState<TSearchResult[]>([]);
  const [facetMap, setFacetMap] = useState<FacetMapType>({});
  const [searchQuery, setSearchQuery] = useState<string[]>([]);
  const facets = useRef<string[]>([]);

  const [facetSections, setFacetSections] = useState<boolean[]>([]);

  const mapFacets = (d: DataType, keys: string[]): FacetMapType => {
    const uniqueValues: FacetMapType = {};

    keys.forEach((key) => {
      const uniqueKeyValues: any = Array.from(new Set(d.map((item: any) => item[key])));
      uniqueValues[key] = uniqueKeyValues;
    });
    return uniqueValues;
  };

  useEffect(() => {
    if (typeof initialFacets === 'string') {
      facets.current = initialFacets.split(':').map((key) => camelCase(key));
    } else if (Array.isArray(initialFacets)) {
      facets.current = initialFacets.map((key) => camelCase(key));
    }
    const initialState: boolean[] = Array(facets.current.length).fill(false);
    initialState[0] = true;
    setFacetSections(initialState);
    if (data && facets.current) {
      setFacetMap(mapFacets(data, facets.current));
    }
  }, [data, initialFacets]);

  useEffect(() => {
    if (data) {
      setSearchResults(filterData({
        data,
        searchCriteria: searchQuery.toString(),
      }) as TSearchResult[]);
    }
  }, [data, searchQuery]);

  const toggleSection = (index: number) => {
    const newSectionStates = [...facetSections];
    newSectionStates[index] = !newSectionStates[index];
    setFacetSections(newSectionStates);
  };

  const removeFilter = (filter: string) => {
    setSearchQuery(searchQuery.filter((id) => id !== filter));
  };

  const handleCheckboxChange = (id: string) => {
    if (searchQuery.includes(id)) {
      setSearchQuery(searchQuery.filter((filterId) => filterId !== id));
    } else {
      setSearchQuery([...searchQuery, id]);
    }
  };

  const makeSideBar = () => (
    <div className="govuk-grid-column-one-third">
      <div className="filter-form">
        {/* Search input here */}
        <div className="app-c-mobile-filters">
          <button
            role="button"
            type="button"
            className="app-c-button-as-link app-mobile-filters-link js-toggle-mobile-filters"
            aria-controls="facet-wrapper"
            aria-expanded="false"
          >
            Filter
            <span className="govuk-visually-hidden"> results</span>
            <span className="js-selected-filter-count">
              {`(${searchQuery.length})`}
              <span className="govuk-visually-hidden"> filters currently selected</span>
            </span>
          </button>
          {filterExpanderUp}
          {filterExpanderDown}
        </div>
        <div>
          <Link
            className="gem-c-skip-link govuk-skip-link govuk-!-display-none-print"
            href="#results"
          >
            Skip to results
          </Link>
        </div>
        <div className="facets" id="facet-wrapper" role="search" aria-label="search filters">
          <div className="facets__box">
            <h2 className="govuk-visually-hidden">Filter</h2>
            <div className="facets__header">
              <div>
                <h3 className="gem-c-heading govuk-heading-s govuk-!-margin-bottom-0">
                  <span className="js-result-count govuk-!-font-weight-regular">
                    {searchResults.length}
                    {' '}
                    {searchType}
                  </span>
                </h3>
              </div>
            </div>
            <div className="facets__content">
              <h3 className="govuk-heading-m">
                Filter
                {' '}
                {searchType}
              </h3>
              {facetMap
                && Object.entries(facetMap).map(([key, value], index) => (
                  <FacetSidebarSection
                    key={key}
                    facetSections={facetSections}
                    toggleSection={() => toggleSection(index)}
                    index={index}
                    handleCheckboxChange={handleCheckboxChange}
                    value={value}
                    name={key}
                    searchQuery={searchQuery}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const groupedFacets = (d: string[]) => {
    const result = d.reduce((acc, item) => {
      const [group, name] = item.split(':');

      if (!acc[group]) {
        acc[group] = [];
      }

      acc[group].push(name.trim());

      return acc;
    }, {} as { [key: string]: string[] });

    // Sort the groups based on the order defined in the 'facetMap' object
    const sortedResult: { [key: string]: string[] } = {};
    Object.keys(facetMap).forEach((group) => {
      if (result[group]) {
        sortedResult[group] = result[group]
          .sort((a, b) => facetMap[group]
            .indexOf(a) - facetMap[group].indexOf(b));
      }
    });

    return sortedResult;
  };

  const makeSearchResults = () => (
    <div
      className="govuk-grid-column-two-thirds js-live-search-results-block filtered-results"
      role="region"
      aria-label={`${searchType} search results`}
    >
      <div id="js-search-results-info" className="result-info govuk-!-margin-bottom-0">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <div className="result-info__header">
              <h2
                id="js-result-count"
                className="gem-c-heading govuk-heading-s govuk-!-margin-bottom-2"
              >
                {searchResults.length}
                {' '}
                {startCase(searchType)}
              </h2>
              <div>
                <Link
                  scroll
                  className="gem-c-skip-link govuk-skip-link govuk-!-display-none-print"
                  href="#results"
                >
                  Skip to results
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div id="js-facet-tag-wrapper" className="facet-tags__container" aria-live="assertive">
          <span
            className="govuk-visually-hidden"
          >
            {searchResults.length}
            {' '}
            {startCase(searchType)}
          </span>
          <div className="facet-tags">
            {searchQuery.length > 0
              ? Object.entries(groupedFacets(searchQuery))
                .map(([groupId, items]: [string, string[]]) => (
                  <div key={groupId} id={groupId} className="facet-tags__group">
                    {items.map((item: string, index: number) => (
                      <div key={`${groupId}:${item}-${index + 1}`} className="facet-tags__wrapper">
                        <span className="facet-tags__preposition">
                          {index === 0 ? `Of ${startCase(groupId)}` : ' or '}
                        </span>
                        <span className="facet-tag">
                          <span className="facet-tag__text">{startCase(item)}</span>
                          <button
                            role="button"
                            onClick={() => removeFilter(`${groupId}:${item}`)}
                            type="button"
                            name={`${groupId}:${item}`}
                            className="facet-tag__remove"
                            aria-label={`Remove filter ${startCase(item)}`}
                          >
                            ✕
                          </button>
                        </span>
                      </div>
                    ))}
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
      <div id="results">
        <div className="finder-results js-finder-results">
          <ul
            className="gem-c-document-list gem-c-document-list--no-underline
            gem-c-document-list--no-top-border-first-child govuk-!-margin-bottom-5"
          >
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <li key={camelCase(item[titleField] as string)} className="gem-c-document-list__item">
                  <div className="gem-c-document-list__item-title">
                    <Link className="govuk-link" href={item[urlField] as string}>
                      {item[titleField]}
                    </Link>
                  </div>
                  <p className="gem-c-document-list__item-description">{item[descriptionField]}</p>
                </li>
              ))
            ) : (
              <div className="no-results govuk-!-font-size-19">
                <p className="govuk-body govuk-!-font-weight-bold">
                  There are no matching results.
                </p>
                <p className="govuk-body">Improve your search results by:</p>
                <ul className="govuk-list govuk-list--bullet">
                  <li>removing filters</li>
                  <li>double-checking your spelling</li>
                  <li>using fewer keywords</li>
                  <li>searching for something less specific</li>
                </ul>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="govuk-grid-row">
      {makeSideBar()}
      {makeSearchResults()}
    </div>
  );
};

export default FacetSearch;
