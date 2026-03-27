"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch } from "react-redux";

import { updateUserByAdmin } from "@/features/user/userSlice";
import { getUser } from "@/features/user/userApi";

export default function EditUserPage(){

  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();

  const userId = params.id;

  const [form,setForm] = useState({
    name:"",
    email:"",
    phone:"",
    role:"CUSTOMER"
  });

  useEffect(()=>{

    const loadUser = async () => {

      const data = await getUser(userId);

      setForm({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        role: data.role || "CUSTOMER"
      });

    };

    loadUser();

  },[userId]);

  const handleChange = (e)=>{

    const {name,value} = e.target;

    setForm({
      ...form,
      [name]: value
    });

  };

  const handleSubmit = async (e)=>{

    e.preventDefault();

    await dispatch(updateUserByAdmin({
      id:userId,
      data:form
    }));

    alert("User updated");

    router.push("/admin/users");

  };

  return (

    <div style={{padding:40,maxWidth:500}}>

      <h2>Edit User</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Role</label>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

        </div>

        <button type="submit">
          Update User
        </button>

      </form>

    </div>

  );
}