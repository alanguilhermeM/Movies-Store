import Header from "@/components/Header";
import MyMoviesCard from "@/components/MyMovies";

const MyMovies: React.FC = () => {
  return (
    <article className="w-full">
      <Header />
      <main className="bg-[#11151C] pt-[4rem]">
        <MyMoviesCard />
      </main>
    </article>
  );
};

export default MyMovies;
