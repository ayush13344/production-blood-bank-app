import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome=()=>{
    const {user} =useSelector(state=>state.auth)
    return (
    <Layout>
        <div className="constainer">
            <div className="d-flex flex-column mt-4">
                <h1>Welcome Admin <i className="text-success bg-light">{user?.name}</i></h1>
                <p>Manage Blood bank app </p>
            </div>
        </div>
    </Layout>
    );
};

export default AdminHome;
