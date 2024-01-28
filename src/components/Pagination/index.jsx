import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ page, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={2}
      forcePage={page - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
