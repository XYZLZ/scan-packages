/* eslint-disable react/prop-types */
const Pagination = ({ data, currentPage, setCurrentPage }) => {
  
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  // eslint-disable-next-line no-unused-vars
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
  return (
    <div className="flex justify-center items-end mt-1">
      <nav aria-label="Pagination">
        <ul className="inline-flex items-center space-x-1 rounded-md text-sm">
          {currentPage !== 1 && (
            <li>
              <a
                onClick={prevPage}
                className="inline-flex items-center space-x-2 rounded-full border border-gray-300 bg-white px-2 py-2 font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          )}
          <li>
            <span className="inline-flex items-center space-x-1 rounded-md bg-white px-4 py-2 text-gray-500">
              Page <b className="mx-1">{currentPage}</b> of{" "}
              <b className="ml-1">{numbers.length}</b>
            </span>
          </li>
          {currentPage !== lastIndex && (
            <li>
              <a
                onClick={nextPage}
                className="inline-flex items-center space-x-2 rounded-full border border-gray-300 bg-white px-2 py-2 font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
