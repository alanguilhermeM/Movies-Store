import Header from "@/components/Header";
import { useUseContext } from "@/context/userContext";
import { UserContextType } from "@/interfaces/interfaces";
import { api } from "@/service/api";
import avatarPath from "@/utils/avatarPath";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Profile: React.FC = () => {
  const [_sideBarOn, setSideBarOn] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const { user, handleUser } = useUseContext() as UserContextType;
  const [profile, setProfile] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    getStorage()
  }, [])

  const getStorage = () => {
    const storage = localStorage.getItem('User');
    if (storage) {
      const userS = JSON.parse(storage);
      if (userS.image_path.length > 1) setImageURL(userS.image_path)
    }
  }
  const handleImg: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    const url = (e.target as HTMLImageElement).alt;
    setImageURL(url)
    setProfile(false)
  };

  const handleForm = async (e: any) => {
    e.preventDefault()
    try {
      const newUser = await api.put(`/user/${user?.id}`, {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        image_path: imageURL,
      });

      handleUser(newUser.data.userUpdated);
      localStorage.setItem('User', JSON.stringify(newUser.data.userUpdated))
    } catch (error: any) {
      console.log(error.response);
    }
    router.push('/')
  }

  return (
    <>
      <Header setSideBarOn={setSideBarOn} />
      
      {profile ? (
        <>
          {/* Overlay to darken the background */}
          <div className="fixed inset-0 bg-black opacity-80 z-10" />
          
          {/* Highlighted area */}
          <div className="relative flex justify-center items-center h-[860px] z-20">
            <div className="bg-gray-800 flex flex-wrap justify-around items-center w-1/5 h-3/5 rounded-lg p-6">
              {avatarPath.map((avatar) => (
                <button onClick={handleImg} key={avatar}>
                  <Image src={avatar} width={70} height={70} alt={avatar} quality={100} className="mr-5 ml-5 hover:scale-150 transition-all hover:cursor-pointer"/>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-[860px]">
          <div className="bg-gray-800 flex flex-col justify-center items-center w-2/5 h-3/5 rounded-lg p-6 drop-shadow-2xl">
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300">
              <button onClick={() => setProfile(true)} className="relative left-40 top-14 hover:scale-110">
                <i className="bi bi-pencil text-lg"></i>
              </button>
              <Image
                src={imageURL || "/profile.png"}
                alt="Profile"
                width={150}
                height={150}
                className="ml-4 bg-transparent"
              />
            </div>
            
            <form className="flex flex-col" onSubmit={handleForm}>
              <label htmlFor="profile-image" className="text-white mt-4">Nome:</label>
              <input 
                type="text" 
                name="name"
                defaultValue={user?.name}
                ref={nameRef} 
                className="mt-2 p-2 rounded bg-gray-700 text-white" 
              />

              <label htmlFor="profile-image" className="text-white mt-4">Email:</label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                ref={emailRef}
                className="mt-2 p-2 rounded bg-gray-700 text-white"
              />

              <button 
                type="submit" 
                className="text-white mt-5 pt-2 pb-2 bg-black rounded-lg hover:scale-105 top-16 transition-all"
              >Salvar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
