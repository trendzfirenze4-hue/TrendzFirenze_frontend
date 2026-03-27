"use client";

import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { updateCategory } from "@/features/categories/categorySlice";
import api from "@/lib/apiClient";
import { useRouter,useParams } from "next/navigation";

export default function EditCategoryPage(){

  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();

  const id = params?.id;

  const [name,setName] = useState("");

  useEffect(()=>{

    if(!id) return;

    api.get("/api/categories")
      .then(res=>{
        const cat = res.data.find(c=>c.id==id);
        if(cat) setName(cat.name);
      });

  },[id]);

  const handleUpdate = async()=>{

    await dispatch(updateCategory({
      id,
      data:{name}
    }));

    alert("Category updated");

    router.push("/admin/categories/list");
  };

  return(

    <div style={{padding:"40px"}}>

      <h1>Edit Category</h1>

      <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleUpdate}>
        Update
      </button>

    </div>

  );
}