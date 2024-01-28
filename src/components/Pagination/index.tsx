import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import React from 'react';

type PaginationProps = {
  currentPage: number;
  onChangePage: any;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={2}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
