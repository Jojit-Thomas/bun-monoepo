"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "backend-api";
import {} from "@elachisync";
import { GoogleLogin } from "@react-oauth/google";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      setLoading(true);
      // const url = `${process.env.NEXT_PUBLIC_ELACHI_SYNC_API}/auth/login/success`;
      // const { data } = await axios.get(url, { withCredentials: true });
      const { data } = await api.auth.index.get();

      // setUser(data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    window.open(`${process.env.NEXT_PUBLIC_ELACHI_SYNC_API}/auth/logout`, "_self");
  };

  const login = async () => {
    const { data } = await api.auth.google.login.get();
    if (data?.redirectTo) window.location.href = data?.redirectTo;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold"> ElachiSync</h1>
      <Image src="/elachi.png" alt="ElachiSync" width={500} height={500} />
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className="flex flex-col items-center">
          <img src={user.picture} alt={user.name} className="rounded-full" />
          <p className="text-2xl font-bold">{user.name}</p>
          <p className="text-xl font-semibold">{user.email}</p>
          <button onClick={logout} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={login} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Login
        </button>
      )}
    </main>
  );
}

// export default function Home() {
//   return (
//     <div className="w-screen h-screen bg-zinc-500">
      
//       <GoogleLogin
//         onSuccess={(credentialResponse) => {
//           console.log(credentialResponse);
//         }}
//         onError={() => {
//           console.log("Login Failed");
//         }}
//       />
//       ;
//     </div>
//   );
// }