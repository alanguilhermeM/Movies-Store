import { useCardContext } from "@/context/movieCardContext";
import { useSideBarContext } from "@/context/sideBarContext";
import { MovieCardContextType, sideBarContextType } from "@/interfaces/interfaces";
import { handlePage } from "@/utils/cardMovieHandlers";

const Pagination: React.FC = () => {
  const { currentPage, setCurrentPage } =
    useCardContext() as MovieCardContextType;
  const { sideBar } = useSideBarContext() as sideBarContextType;

  return (
    <nav
      aria-label="Paginação"
      className={`flex w-full justify-center items-center p-4 transition-all ease-in-out duration-300 ${
        sideBar ? "xl:ml-[25%] xl:w-[75%] 2xl:ml-[20%] 2xl:w-[80%]" : ""
      }`}
    >
      <button
        onClick={(e) => handlePage(e, { setCurrentPage, currentPage })}
        value="Previous"
        className={`mr-4 ml-4 max-xl:w-1/2 xl:w-1/4 ${
          currentPage === 1 ? "bg-gray-700" : "bg-gray-800"
        }  text-white rounded-lg p-2 hover:scale-105 transition-all`}
        disabled={currentPage === 1 ? true : false}
      >
        Previous Page
      </button>
      <button
        onClick={(e) => handlePage(e, { setCurrentPage, currentPage })}
        value="Next"
        className={`mr-4 ml-4 max-xl:w-1/2 xl:w-1/4 ${
          currentPage >= 5 ? "bg-gray-700" : "bg-gray-800"
        }  text-white rounded-lg p-2 hover:scale-105 transition-all`}
        disabled={currentPage >= 5}
      >
        Next Page
      </button>
    </nav>
  );
};

export default Pagination;
