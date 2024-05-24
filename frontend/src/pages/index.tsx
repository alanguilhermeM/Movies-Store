import CardMovie from "@/components/CardMovie";
import Header from "@/components/Header";
import { useEffect, useState } from "react"; // Add Dispatch and SetStateAction types to the import statement



const Home: React.FC = () => {
  const [sideBarOn, setSideBarOn] = useState(false);
  
  useEffect(() => {
  }, [sideBarOn])
  return (
    <>
      <Header setSideBarOn={setSideBarOn} />
      <main className="bg-gray-500 h-[130rem] w-full">
        <CardMovie sideBarOn={sideBarOn}/>
      </main>
    </>
  );
}

export default Home