"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { uploadProductImages } from "@/features/products/uploadSlice";
import { createProduct } from "@/features/products/adminProductSlice";
import { fetchCategories } from "@/features/categories/categorySlice";

export default function CreateProductPage(){

  const dispatch = useDispatch();
  const router = useRouter();

  const categories = useSelector(state => state.categories.items);

  const uploadedImages = useSelector(state=>state.upload.images);

  const [loading,setLoading] = useState(false);

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [stock,setStock] = useState("");
  const [categoryId,setCategoryId] = useState("");

  const [files,setFiles] = useState([]);

  // REMOVE IMAGE (Amazon-style)
  const removeImage = (index)=>{

    const arr = [...uploadedImages];
    arr.splice(index,1);

    dispatch({
      type:"upload/setImages",
      payload:arr
    });

  };


  useEffect(()=>{
  dispatch(fetchCategories());
},[dispatch]);


  // UPLOAD IMAGES
  const handleUpload = async ()=>{

    if(files.length === 0) return;

    try{

      await dispatch(uploadProductImages(files)).unwrap();

      setFiles([]);

    }catch(err){

      alert("Upload failed");

    }

  };


  // CREATE PRODUCT
  const handleCreate = async ()=>{

    if(loading) return;

    setLoading(true);

    try{

      const data = {

        title,
        description,
        priceInr:Number(price),
        stock:Number(stock),
        categoryId:Number(categoryId),
        images:uploadedImages

      };

      await dispatch(createProduct(data)).unwrap();

      alert("Product Created");

      router.push("/admin/products/list");

    }catch(err){

      console.error(err);
      alert("Create failed");

    }

    setLoading(false);

  };


  return (

    <div style={{padding:"40px"}}>

      <h1>Create Product</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <br/><br/>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Price"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Stock"
        value={stock}
        onChange={(e)=>setStock(e.target.value)}
      />

      <br/><br/>

     <select
  value={categoryId}
  onChange={(e)=>setCategoryId(e.target.value)}
>

  <option value="">Select Category</option>

  {categories.map(cat => (

    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>

  ))}

</select>

      <br/><br/>

      <input
        type="file"
        multiple
        onChange={(e)=>setFiles([...e.target.files])}
      />

      <br/><br/>

      <button onClick={handleUpload}>
        Upload Images
      </button>

      <br/><br/>

      <h3>Images</h3>

      <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>

        {uploadedImages.map((img,i)=>{

          return(

            <div
              key={i}
              style={{
                position:"relative",
                border:"1px solid #ddd",
                padding:"4px",
                borderRadius:"6px"
              }}
            >

              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE}${img}`}
                width="120"
              />

              <button
                onClick={()=>removeImage(i)}
                style={{
                  position:"absolute",
                  top:"-6px",
                  right:"-6px",
                  background:"red",
                  color:"#fff",
                  border:"none",
                  borderRadius:"50%",
                  width:"22px",
                  height:"22px",
                  cursor:"pointer"
                }}
              >
                ×
              </button>

            </div>

          );

        })}

      </div>

      <br/><br/>

      <button
        onClick={handleCreate}
        disabled={loading}
      >

        {loading ? "Creating..." : "Create Product"}

      </button>

    </div>

  );

}