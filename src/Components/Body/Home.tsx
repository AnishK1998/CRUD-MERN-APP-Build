import React,{useState, useEffect} from "react";
import {DataGrid, GridColDef,GridValueGetterParams, GridCellParams} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { CustomNoRowsOverlay } from "./NoData";
import "./Body.css";
import Register from "./Register/Register";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {formdata} from "../Models/model"
import axios from "axios"

const Home = () => {
  const [toggleRegister, setToggleRegister] = useState<boolean>(false);
  const [row,setRow] = useState<formdata []>();
  const [editData , setEditData] = useState<formdata>();
  const [editDataToggler, setEditDataToggler] = useState<boolean>(false);
  const [deleteToggler, setDeleteToggler] = useState<boolean>(false)
  const history = useNavigate();

  const handleEdit= (itemId: string | number) => {
    setToggleRegister(!toggleRegister)
    const filterEditData:formdata | undefined = row?.filter((item:formdata) => item._id === itemId)[0];
    setEditData(filterEditData)
    setEditDataToggler(true)
  };

  const handleView = (itemId: string | number) => {
    history(`/${itemId}`)
    console.log("printing from handleView ", itemId);
  };

  const handleDelete = (item: string | number) => {
    axios.delete(`/deleteUser/${item}`).then((res) => {
      toast.success("User is deleted sucessfully")
      setDeleteToggler(!deleteToggler)
    })
    .catch(err => toast.error("failed to delete user"))
    console.log("printing from handleDelete ", item);
  };

  const handleAddData = ()=>{
    setToggleRegister(!toggleRegister)
    setEditDataToggler(false)
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 170 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 70,
    },
    {
      field: "work",
      headerName: "Profession",
      description: "This column has a value getter and is not sortable.",
      width: 140
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 280,
      renderCell: (params: GridCellParams) => (
        <div className="flex justify-between w-64">
          <div>
            <Button
              variant="contained"
              color="success"
              size="small"
              style={{ width: "30%" }}
              onClick={() => handleView(params.row.id)}
            >
              <i className="fa-solid fa-eye py-1"></i>
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="warning"
              size="small"
              style={{ width: "30%" }}
              onClick={() => handleEdit(params.row.id)}
            >
              <i className="fa-solid fa-pen py-1"></i>
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="error"
              size="small"
              style={{ width: "30%" }}
              onClick={() => handleDelete(params.row.id)}
            >
              <i className="fa-solid fa-trash-can py-1"></i>
            </Button>
          </div>
        </div>
      ),
    },
  ];

  useEffect(()=>{
    console.log("printing from useEffect ")
    axios.get("https://crud-mern-app-backend.onrender.com/getalluser").then((res) => {
      const modifiedRows = res.data.map((item : any) => {
        return {...item, id: item._id}
      })
      setRow(modifiedRows)
      console.log(modifiedRows)
    }).catch(err => console.log("err from getalluser",err))
  },[toggleRegister, deleteToggler])
  
  return (
      <div
        className="w-full flex justify-center items-center md:mx-auto"
        style={{ height: "35rem" }}
      >
        <ToastContainer />
        <div className="w-auto overflow-auto mx-4">
          <div className="flex justify-end mb-2">
            <Button variant="contained" onClick={handleAddData}>Add data</Button>
          </div>
          <div style={{ height: "24rem", width: "auto", overflow: "auto" }}>
            <DataGrid
            className="table-wrapper"
              rows={ row && (row) || []}
              slots={{
                noRowsOverlay: CustomNoRowsOverlay,
              }}
              columns={columns}
              autoPageSize={true}
            />
          </div>
        </div>
        {
            toggleRegister && (<Register toggleRegister={toggleRegister} setToggleRegister={setToggleRegister}
              editData={editData} editDataToggler={editDataToggler} setEditDataToggler={setEditDataToggler}
            />)
        }
      </div>
  );
};

export default Home;
