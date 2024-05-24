import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUseContext } from "@/context/userContext";
import { UserContextType } from "@/interfaces/interfaces";
import { TUser } from "@/types/userTypes";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import SideBar from "./SideBar";
import { HeaderProps } from "@/types/componentTypes";


const Header: React.FC<HeaderProps> = ({  setSideBarOn }) => {
  const { user } = useUseContext() as UserContextType;
  const [loggedIn, setLoggedIn] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const [keepLogged, setKeepLogged] = useState<TUser | undefined>(user)
  const [img, setImg] = useState<string | undefined>('')
  // const router = useRouter()

  useEffect(() => {
    isLoggedIn(user);
    setSideBarOn(sideBar)
    if (user?.image_path && user?.image_path.length > 1) {
      setImg(user?.image_path)
    }
  }, [user, sideBar]);

  const isLoggedIn = (user: TUser | undefined) => {
    const isLogged = localStorage.getItem('User');
    // console.log
    if (isLogged) {
      setKeepLogged(JSON.parse(isLogged))
      setLoggedIn(true);
      return
    }

    if (user) {
      localStorage.setItem('User', JSON.stringify(user));
      setLoggedIn(true);
      return
    }
  };

  // const handleUser = () => {
  //   router.push('/configurations')
  // }

  const Open = () => {
    if (loggedIn) {
      setSideBar(true);
      document.querySelector('#sidebar')?.classList.toggle('left-[-18.75rem]');
    }
  }

  return (
    <header className="flex p-3 bg-gray-800 justify-center shadow-2xl m-0">
      <div className="flex items-center w-4/5 text-2xl text-white justify-center m-0">
        {loggedIn ?
        <div className="h-16">

          <Image
            id="profile"
            src={img || '/profile.png'}
            alt="Locadora Logo"
            width={70}
            height={70}
            quality={50}
            className={`relative rounded-full cursor-pointer hover:scale-105 transition-all right-[42rem] ${sideBar ? 'hidden' : ''}`}
            onClick={() => Open()}
          />
          <SideBar 
            sideBar={sideBar} 
            keepLogged={keepLogged} 
            setSideBar={setSideBar} 
            loggedIn={loggedIn}
          />
          
        </div> :
        <div className="flex items-center w-full justify-between">
          <Image
            src="/logoMovie.png"
            alt="Locadora Logo"
            width={50}
            height={50}
            quality={50}
          />
          <div className="flex w-[12rem] justify-between">
            <Link href="/login" className="hover:scale-105 transition-all">Login</Link>
            <Link href="/register" className="hover:scale-105 transition-all">Sign Up</Link>
          </div>    
        </div>
        }
        
      </div>
    </header>
  );
};

export default Header;
