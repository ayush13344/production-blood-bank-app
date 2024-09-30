import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

const DonorList=()=>{
    const [data,setData]=useState([]);
    const getDonors= async()=>{
        try{
            const {data}= await API('/admin/donor-list');
            console.log(data);
            if(data?.success){
                setData(data?.donorData); 
            }
        }catch(error){
            console.log(error); 
        }
    };
    useEffect(()=>{
        getDonors();
    },[]);  
const handleDelete=async(id)=>{
    try{
        let answer=window.prompt("Are you sure you want to delete this Donor","sure");
        if(!answer){
        const {data}=await API.delete(`/admin/delete-donor/${id}`);
        alert(data?.message);
        window.location.reload();
        }
    }catch(error){
        console.log(error);
    }
}

    return (
        <Layout>
          <table className="table ">
              <thead>
                <tr>
                  <th scope="col">name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col"> date</th>
                  <th scope="col"> Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map(record => (
                  <tr key={record._id}>

                    <td>{record.name || record.organisationName + "(ORG)"} </td>
                    <td>{record.email} </td>
                    <td>{record.phone} </td>
                    <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')} </td>
                    <td><button className="btn btn-danger" onClick={()=>handleDelete(record._id)}>Delete</button> </td>
                  </tr>
                ))}

              </tbody>
            </table>
        </Layout>
    );
};


export default DonorList;