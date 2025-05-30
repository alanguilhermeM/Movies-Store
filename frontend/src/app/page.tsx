"use client"
import CardMovie from "@/components/CardMovie";
import Header from "@/components/Header";
import AuthSync from "@/components/AuthSync";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const Home: React.FC = () => {
  // const { data: session, status } = useSession();

  // useEffect(() => {
  //   console.log(session, status)
  // }, [status])
  return (
    <article className="w-full min-h-screen">
      <Header />
      <AuthSync />
      <main className="bg-gray-500 pt-[4rem] min-h-screen">
        <CardMovie />
      </main>
    </article>
  );
};

export default Home;
