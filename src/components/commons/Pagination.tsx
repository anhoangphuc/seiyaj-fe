import ReactPaginate from "react-paginate";
import { ReactPaginateProps } from "react-paginate";
interface PaginationProps {
  totalPages: number;
  onPageChange: (event: any) => void;
  className?: string;
  pageRangeDisplayed?: number;
}

const Pagination = ({
  totalPages,
  onPageChange,
  className,
  pageRangeDisplayed = 5,
  ...props
}: PaginationProps) => {
  return (
    <div className={`${className} pagination-wrapper`}>
      <ReactPaginate
        {...props}
        breakLabel="..."
        nextLabel=">"
        onPageChange={onPageChange}
        pageRangeDisplayed={pageRangeDisplayed}
        pageCount={totalPages}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
