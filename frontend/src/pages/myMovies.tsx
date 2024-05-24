// import CardMovie from "@/components/CardMovie";
import Header from "@/components/Header";
import MyMoviesCard from "@/components/MyMovies";
import { useEffect, useState } from "react"; // Add Dispatch and SetStateAction types to the import statement



const MyMovies: React.FC = () => {
  const [sideBarOn, setSideBarOn] = useState(false);
  
  useEffect(() => {
    // console.log(sideBarOn)
  }, [sideBarOn])
  return (
    <>
      <Header setSideBarOn={setSideBarOn} />
      <main className="bg-[#11151C] h-[130rem] w-full">
        <MyMoviesCard sideBarOn={sideBarOn} />
      </main>
    </>
  );
}

export default MyMovies