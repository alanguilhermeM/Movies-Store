import { api } from "@/service/api";
import { useRouter } from "next/router";
import React, { useRef, FormEvent, useState }  from "react";

const Register: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [registeredEmail, setRegisteredEmail] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    
    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const image_path = ''
    
    try {
        const response = await api.post('/user', { name, email, image_path });
    
        if(response.status === 201) {
            router.push('/');
        }
        
    } catch (error) {
        console.error("Erro ao enviar requisição:", error);
        setRegisteredEmail(true);
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-r bg-gray-400 justify-center">
      <main className="flex justify-center items-center w-[42rem]">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full bg-white h-4/6 rounded-xl text-2xl text-gray-600 drop-shadow-2xl">
          <h1 className="relative bottom-20 text-4xl">Sign Up</h1>
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
          {registeredEmail ? <span className="text-red-600 text-sm relative top-10 animate-bounce">Email já cadastrado!</span> : null}

          <button 
            type="submit"
            className="relative bg-gray-800 text-white pt-2 pb-2 w-4/6 rounded-xl hover:scale-105 top-16 transition-all"
            >Sign Up</button>
        </form>
      </main>
    </div>
  );
}

export default Register;
