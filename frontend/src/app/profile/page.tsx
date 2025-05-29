"use client";
import Header from "@/components/Header";
import { useUserContext } from "@/context/userContext";
import { UserContextType } from "@/interfaces/interfaces";
import { api } from "@/service/api";
import { TUser } from "@/types/userTypes";
import avatarPath from "@/utils/avatarPath";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Profile: React.FC = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const { handleUser } = useUserContext() as UserContextType;
  const [profile, setProfile] = useState(false);
  const [userS, setUserS] = useState<TUser>();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    getStorage();
  }, []);

  const getStorage = () => {
    const storage = localStorage.getItem("User");
    if (storage) {
      const user = JSON.parse(storage);
      if (user) setUserS(user);
      if (user.image_path.length > 1) setImageURL(user.image_path);
    }
  };
  const handleImg: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    const url = (e.target as HTMLImageElement).alt;
    setImageURL(url);
    setProfile(false);
  };

  const handleForm = async (e: any) => {
    e.preventDefault();
    try {
      const newUser = await api.put(`/user/${userS?.id}`, {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        image_path: imageURL,
      });

      handleUser(newUser.data.userUpdated);
      localStorage.setItem("User", JSON.stringify(newUser.data.userUpdated));
    } catch (error: any) {
      console.log(error.response);
    }
    router.push("/");
  };

  return (
    <article className="min-h-screen">
      <Header />
      {profile ? (
        <main>
          <div className="fixed inset-0 bg-black opacity-80 z-10" />
          <section className="relative flex justify-center items-center h-[860px] z-20">
            <div className="bg-gray-800 flex flex-wrap justify-around items-center w-4/5 sm:w-3/5 md:w-2/5 lg:w-2/5 xl:w-2/6 2xl:w-[20%] 3xl:w-[15%] h-3/5 rounded-lg p-6">
              {avatarPath.map((avatar) => (
                <button onClick={handleImg} key={avatar}>
                  <Image
                    src={avatar}
                    width={70}
                    height={70}
                    alt={avatar}
                    quality={100}
                    className="mr-5 ml-5 hover:scale-150 transition-all hover:cursor-pointer"
                  />
                </button>
              ))}
            </div>
          </section>
        </main>
      ) : (
        <main className="w-full">
          <section className="bg-gray-800 flex flex-col justify-center items-center min-h-screen">
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300">
              <button
                onClick={() => setProfile(true)}
                className="relative left-40 top-14 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  // className="text-xl"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                </svg>
              </button>
              <Image
                src={imageURL || "/profile.png"}
                alt="Profile"
                width={150}
                height={150}
                className="bg-transparent"
              />
            </div>

            <form className="flex flex-col" onSubmit={handleForm}>
              <label htmlFor="profile-image" className="text-white mt-4">
                Nome:
              </label>
              <input
                type="text"
                name="name"
                defaultValue={userS?.name}
                ref={nameRef}
                className="mt-2 p-2 rounded bg-gray-700 text-white"
              />

              <label htmlFor="profile-image" className="text-white mt-4">
                Email:
              </label>
              <input
                type="email"
                name="email"
                defaultValue={userS?.email}
                ref={emailRef}
                className="mt-2 p-2 rounded bg-gray-700 text-white"
              />

              <button
                type="submit"
                className="text-white mt-5 pt-2 pb-2 bg-black rounded-lg hover:scale-105 top-16 transition-all"
              >
                Salvar
              </button>
            </form>
          </section>
        </main>
      )}
    </article>
  );
};

export default Profile;
