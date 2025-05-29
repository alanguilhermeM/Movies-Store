import Form from "@/components/Form";
import React  from "react";

const Login: React.FC = () => {
  return (
    <article className="flex h-screen bg-gradient-to-r bg-gray-400 justify-center">
      <main className="flex justify-center items-center w-full lg:w-[42rem]">
        <Form />
      </main>
    </article>
  );
}

export default Login;
