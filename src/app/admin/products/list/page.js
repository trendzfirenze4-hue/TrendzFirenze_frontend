"use client";

import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchProducts } from "@/features/products/productSlice";
import { deleteProduct } from "@/features/products/adminProductSlice";
import { useRouter } from "next/navigation";

export default function AdminProductsPage(){

  const dispatch = useDispatch();
  const router = useRouter();

  const products = useSelector(state=>state.products.items);

  useEffect(()=>{

    dispatch(fetchProducts());

  },[dispatch]);

  const handleDelete = async(id)=>{

    if(!confirm("Delete this product?")) return;

    await dispatch(deleteProduct(id));

    dispatch(fetchProducts());

  };

  return(

    <div style={{padding:"40px"}}>

      <h1>Admin Products</h1>

      <button onClick={()=>router.push("/admin/products/create")}>
        Create Product
      </button>

      <br/><br/>

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

        {products.map(p=>{

          const img = p.images?.[0];

          return(

            <tr key={p.id}>

              <td>{p.id}</td>

              <td>
                {img && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE}${img}`}
                    width="60"
                  />
                )}
              </td>

              <td>{p.title}</td>
              <td>{p.priceInr}</td>
              <td>{p.stock}</td>

              <td>

                <button
                  onClick={()=>router.push(`/admin/products/edit/${p.id}`)}
                >
                  Edit
                </button>

                <button
                  onClick={()=>handleDelete(p.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          );

        })}

        </tbody>

      </table>

    </div>

  );

}