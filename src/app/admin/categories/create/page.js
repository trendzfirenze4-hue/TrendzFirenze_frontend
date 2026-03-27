"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "@/features/categories/categorySlice";
import { useRouter } from "next/navigation";

export default function CreateCategoryPage(){

  const dispatch = useDispatch();
  const router = useRouter();

  const [name,setName] = useState("");

  const handleCreate = async()=>{

    await dispatch(createCategory({name}));

    alert("Category created");

    router.push("/admin/categories/list");
  };

  return(

    <div style={{padding:"40px"}}>

      <h1>Create Category</h1>

      <input
        placeholder="Category name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleCreate}>
        Create
      </button>

    </div>

  );
}