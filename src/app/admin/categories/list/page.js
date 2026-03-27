"use client";

import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchCategories,deleteCategory } from "@/features/categories/categorySlice";
import { useRouter } from "next/navigation";

export default function CategoryListPage(){

  const dispatch = useDispatch();
  const router = useRouter();

  const {items,loading} = useSelector(
    state=>state.categories
  );

  useEffect(()=>{
    dispatch(fetchCategories());
  },[dispatch]);

  if(loading) return <p>Loading...</p>;

  return(

    <div style={{padding:"40px"}}>

      <h1>Categories</h1>

      <button
        onClick={()=>router.push("/admin/categories/create")}
      >
        Create Category
      </button>

      <br/><br/>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {items.map(cat=>(
            <tr key={cat.id}>

              <td>{cat.id}</td>
              <td>{cat.name}</td>

              <td>

                <button
                  onClick={()=>router.push(`/admin/categories/edit/${cat.id}`)}
                >
                  Edit
                </button>

                <button
                  onClick={()=>dispatch(deleteCategory(cat.id))}
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