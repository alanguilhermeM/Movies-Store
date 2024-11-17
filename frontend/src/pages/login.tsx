import Form from "@/components/Form";
import React  from "react";

const Login: React.FC = () => {
  return (
    <main className="flex h-screen bg-gradient-to-r bg-gray-400 justify-center">
      <article className="flex justify-center items-center w-[42rem]">
        <Form />
      </article>
    </main>
  );
}

export default Login;
