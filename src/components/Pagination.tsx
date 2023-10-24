'use client';

import React, { useState } from 'react';
import { DataType } from '@/types';

interface PaginationProps {
    data: DataType;
    itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ data = [], itemsPerPage = 1 }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate the total number of pages
  const totalPages: number = data ? Math.ceil(data.length / itemsPerPage) : 0;

  // Calculate the range of items to display on the current page
  // const startIndex: number = (currentPage - 1) * itemsPerPage;
  // const endIndex: number = startIndex + itemsPerPage;

  const handlePageChange = (e: React.MouseEvent<HTMLAnchorElement>, pageNumber: number) => {
    // e.preventDefault()
    setCurrentPage(pageNumber);
  };
  return (data && data.length > 0
        && (
        <nav className="govuk-pagination" role="navigation" aria-label="results">
          {currentPage - 1 !== 0 && (
          <div className="govuk-pagination__prev">
            <a className="govuk-link govuk-pagination__link" onClick={(e) => handlePageChange(e, (currentPage - 1))} href={data[(currentPage - 1)].url as string} rel="prev">
              <svg
                className="govuk-pagination__icon govuk-pagination__icon--prev"
                xmlns="http://www.w3.org/2000/svg"
                height="13"
                width="15"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 15 13"
              >
                <path
                  d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"
                />
              </svg>
              <span className="govuk-pagination__link-title">Previous</span>
            </a>
          </div>
          )}
          <ul className="govuk-pagination__list">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`govuk-pagination__item${currentPage === index + 1 ? ' govuk-pagination__item--current' : ''}`}>
                <a
                  className="govuk-link govuk-pagination__link"
                  onClick={(e) => handlePageChange(e, index + 1)}
                  href={data[index].url as string}
                  aria-current={currentPage === index + 1 ? 'page' : 'false'}
                  aria-label={`Page ${index + 1}`}
                >
                  {index + 1}
                </a>
              </li>
            ))}
          </ul>
          {currentPage !== totalPages && (
          <div className="govuk-pagination__next">
            <a className="govuk-link govuk-pagination__link" href={data[currentPage].url as string} rel="next">
              {' '}
              <span
                className="govuk-pagination__link-title"
              >
                Next
              </span>
              <svg
                className="govuk-pagination__icon govuk-pagination__icon--next"
                xmlns="http://www.w3.org/2000/svg"
                height="13"
                width="15"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 15 13"
              >
                <path
                  d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"
                />
              </svg>
            </a>
          </div>
          )}
        </nav>
        )
  );
};

export default Pagination;
