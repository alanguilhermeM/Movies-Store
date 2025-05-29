import CardMovie from "@/components/CardMovie";
import Header from "@/components/Header";

const Home: React.FC = () => {
  return (
    <article className="w-full min-h-screen">
      <Header />
      <main className="bg-gray-500 pt-[4rem] min-h-screen">
        <CardMovie />
      </main>
    </article>
  );
}

export default Home