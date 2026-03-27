"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  fetchUsers,
  removeUser
} from "@/features/user/userSlice";

export default function AdminUsersPage(){

  const dispatch = useDispatch();
  const router = useRouter();

  const { users } = useSelector(state => state.user);

  useEffect(()=>{
    dispatch(fetchUsers());
  },[dispatch]);

  return (

    <div style={{padding:40}}>

      <h2>All Users</h2>

      <table 
  style={{
    borderCollapse: "collapse",
    width: "100%",
    marginTop: "20px"
  }}
>

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {users.map(user => (

            <tr key={user.id}>

              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.phone}</td>

              <td>

                <button
                  onClick={()=>router.push(`/admin/users/edit/${user.id}`)}
                >
                  Edit
                </button>

                <button
                  onClick={()=>dispatch(removeUser(user.id))}
                  style={{color:"red",marginLeft:10}}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}