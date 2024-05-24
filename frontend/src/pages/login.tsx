import { useUseContext } from "@/context/userContext";
import { UserContextType } from "@/interfaces/interfaces";
import { api } from "@/service/api";
import { useRouter } from "next/router";
import React, { useRef, FormEvent, useState }  from "react";

const Login: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [userExist, setUserExist] = useState(true);
  const { handleUser } = useUseContext() as UserContextType; 
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const email = emailRef.current?.value
    const name = nameRef.current?.value

    try {
      const response = await api.get(`/user/${email}`)
  
      if(response.status === 200 && response.data.User.name === name) {
        handleUser(response.data.User)
        router.push('/')
      } else {
        setUserExist(false)
      }
      
      // setNameExist(true)
    } catch (error) {
        console.error("Erro ao enviar requisição:", error);
        setUserExist(false);
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-r bg-gray-400 justify-center">
      <main className="flex justify-center items-center w-[42rem]">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full bg-white h-4/6 rounded-xl text-2xl text-gray-600 drop-shadow-2xl">
          <h1 className="relative bottom-20 text-4xl">Sign In With</h1>
          <div className="w-4/6 flex justify-between items-center">
            <button 
              className="relative bi bi-facebook bg-[#3b5998] text-white pt-5 pb-5 pr-2 pl-2 w-5/12 rounded-lg bottom-5"
            >Facebook</button>
            <button 
              className="relative bi bi-google bg-gray-800 text-white pt-5 pb-5 pr-2 pl-2 w-5/12 rounded-lg bottom-5"
            >Google</button>

          </div>
          <label className="relative w-4/6 top-5 text-lg pt-2 pb-2">Username</label>
          <input 
            placeholder="Digite seu nome..." 
            name="username" 
            ref={nameRef}
            required
            className="relative pl-4 pt-4 pb-4 w-4/6 rounded-lg top-5 bg-gray-200"
          />

          <label className="relative w-4/6 top-5 text-lg pt-2 pb-2">Email</label>
          <input 
            placeholder="Digite seu email..." 
            name="email"
            ref={emailRef}
            required
            className="relative pl-4 pt-4 pb-4 w-4/6 rounded-lg top-5 bg-gray-200"
          />
          {userExist ? null : <span className="text-red-600 text-sm relative top-10 animate-bounce">Usuario não encontrado, verifique seus dados!</span>}
          <button 
            type="submit" 
            className="relative bg-gray-800 text-white pt-2 pb-2 w-4/6 rounded-xl hover:scale-105 top-16 transition-all"
          >Sign in</button>
          
        </form>
      </main>
    </div>
  );
}

export default Login;
