import { useEffect, useState } from "react";



const Product =()=>{
    const [product, setProduct] = useState([]);
    const [form, setForm] = useState({name:"", quntity:0});
    const [editId, setEditId] = useState(null);
    
    const url = "http://localhost:5007/api/product";
    const header = {"Content-Type":"application/json"};

    const GetAll =()=>{
        fetch(url).then(res=>res.json()).then(res=>setProduct(res));
    }
    useEffect(()=>{GetAll();}, [])

    const create = ()=>{
        fetch(url,{
            method:"POST",
            headers:header,
            body:JSON.stringify(form)
        }).then(()=>{
            GetAll();
            setForm({name:"", quntity:0});
        });
    }

    const deletee = (id)=>{
        fetch(`${url}/${id}`,{
            method:"delete"
        }).then(()=>{
            GetAll();
        });
    };

    const edit = (p)=>{
        setForm({name:p.name, quntity:p.quntity});
        setEditId(p.id)
    }
    const update = ()=>{
        fetch(`${url}/${editId}`,{
            method:"put",
            headers:header,
            body: JSON.stringify({id:editId, ...form})

        }).then(()=>{
            GetAll();
            setForm({name: "", quntity:0})
            setEditId(null)
        })
    }

    const handelChange =(e)=>{
        setForm({...form, [e.target.name]: e.target.value})
    }

  

    return(
        <div className="w-[900] bg-white rounded-xl shadow-xl p-5 m-5 color-black">

            <input 
                type="text" 
                name="name"
                placeholder="Enter Name"
                className="border bg-white p-3 m-3"
                value={form.name}
                onClick={handelChange}
                
                />
            <input 
                type="number" 
                name="quntity"
                placeholder="Enter Qty"
                className="border bg-white p-3 m-3"
                 value={form.quntity}
                onClick={handelChange}
               
                />

                {editId ? (
                    <button onClick={update}>Edit</button>
                ) : (
                    <button onClick={create}>Add</button>
                )}

            <table className="w-full">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map(p =>(
                        <tr key={p.id} className="border-b p-4 m-3 hover:bg-gray-100">
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.quntity}</td>
                         <td>
                            <button
                                onClick={() => edit(p)}
                            className="py-2 px-4 rounded-xl  bg-green-600 hover:bg-green-800">Edit</button>
                         <button className="py-2 px-4 rounded-xl bg-red-600 hover:bg-red-800"
                            onClick={()=> deletee(p.id)}
                         >Delete</button>
                         </td>
                         <td></td>
                    </tr>
                    )
                )}
                    
                </tbody>
            </table>
        </div>
    );
}


export default Product;