



"use client";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function Dashboard(){

  const { user } = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = ()=>{
    dispatch(logout());
    router.push("/login");
  };

  return (

    <div>

      <h1>Admin Dashboard</h1>

      <p>Welcome {user?.name}</p>
      <p>Email: {user?.email}</p>

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>

  );
}











