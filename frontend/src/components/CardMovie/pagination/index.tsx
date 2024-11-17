import { useCardContext } from "@/context/movieCardContext";
import { MovieCardContextType } from "@/interfaces/interfaces";
import { handlePage } from "@/utils/handlers";

const Pagination: React.FC = () => {
  const {  currentPage, setCurrentPage } = useCardContext() as MovieCardContextType;

  return (
    <section>
      {currentPage === 1 ? (
        <nav
          aria-label="Paginação"
          className="flex justify-center items-center relative top-7"
        >
          <button
            onClick={(e) => handlePage(e, { setCurrentPage, currentPage })}
            value="Next"
            className="bg-gray-800 text-white rounded-lg p-2 hover:scale-105 transition-all"
          >
            Next Page
          </button>
        </nav>
      ) : (
        <nav
          aria-label="Paginação"
          className="flex w-full justify-center items-center relative top-7"
        >
          <button
            onClick={(e) => handlePage(e, { setCurrentPage, currentPage })}
            value="Previous"
            className="mr-4 ml-4 bg-gray-800 text-white rounded-lg p-2 hover:scale-105 transition-all"
          >
            Previous Page
          </button>
          <button
            onClick={(e) => handlePage(e, { setCurrentPage, currentPage })}
            value="Next"
            className="mr-4 ml-4 bg-gray-800 text-white rounded-lg p-2 hover:scale-105 transition-all"
          >
            Next Page
          </button>
        </nav>
      )}
    </section>
  );
};

export default Pagination;
