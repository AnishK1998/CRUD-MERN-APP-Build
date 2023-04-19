import React, {useEffect , useState} from "react";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import { useParams } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import { formdata } from "../../Models/model";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import Register from "../Register/Register";

const DetailsPage = () => {
    const {id} = useParams();
    const [userDetails , setUserDetails] = useState<formdata>();
    const [toggleRegister, setToggleRegister] = useState<boolean>(false);
    const [editDataToggler, setEditDataToggler] = useState<boolean>(false);
    const history = useNavigate()
    useEffect(() =>{
      axios.get(`https://crud-mern-app-backend.onrender.com/getIndividualUser/${id}`).then((res) => {
        const modifieduserDetails = res.data;
        modifieduserDetails.id = res.data._id;
        setUserDetails(modifieduserDetails)
      }).catch(err => console.log(err))
    },[toggleRegister])

    const handleEdit = ()=>{
      setToggleRegister(!toggleRegister)
      setEditDataToggler(true)
      toast.success("user details is updated")
    }
    const handleDelete = (item: string | undefined) => {
      axios.delete(`https://crud-mern-app-backend.onrender.com/deleteUser/${item}`).then((res) => {
        toast.success("User is deleted sucessfully")
        history("/")
      })
      .catch(err => toast.error("failed to delete user"))
      console.log("printing from handleDelete ", item);
    };
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "38rem", width: "full" }}
    >
      <div className="drop-shadow-lg bg-slate-100 w-1/2">
        <p className="md:text-2xl font-bold mt-3 mb-5">Welcome {userDetails?.name}</p>
        <div className="mx-5 flex justify-between">
          <div>
            <Avatar
              alt="Avtar photo"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBawizFSEt41xoUEpnWLpEa48oLiWdFlOSziTsb1Lx6Q&usqp=CAU&ec=48665701"
            />
          </div>
          <div className="md:flex items-center">
            <div className="mx-2">
              <Button
                variant="contained"
                color="warning"
                size="small"
                style={{ width: "20%" }}
                onClick={handleEdit}
              >
                <i className="fa-solid fa-pen py-1"></i>
              </Button>
            </div>
            <div className="mx-2">
              <Button
                variant="contained"
                color="error"
                size="small"
                style={{ width: "20%" }}
                onClick={() => handleDelete(userDetails?._id)}
              >
                <i className="fa-solid fa-trash-can py-1"></i>
              </Button>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 mx-5 mt-5 mb-3">
            <div className="text-left">
                <p><i className="fa-solid fa-user mr-2"></i><strong>Name :</strong>{userDetails?.name}</p>
                <p><i className="fa-regular fa-hourglass-half mr-2"></i><strong>Age :</strong>{userDetails?.age}</p>
                <p><i className="fa-solid fa-envelope mr-2"></i><strong>Email :</strong>{userDetails?.email}</p>
                <p><i className="fa-solid fa-user-tie mr-2"></i><strong>Occupation :</strong>{userDetails?.work}</p>
            </div>
            <div className="text-left">
                <p><LocalPhoneIcon fontSize="inherit" className="mr-1"/><strong>Mobile :</strong>{userDetails?.mobile}</p>
                <p><i className="fa-solid fa-location-dot mr-2"></i><strong>Location :</strong>{userDetails?.address}</p>
                <p><MarkChatUnreadIcon fontSize="inherit" className="mr-1"/><strong>Description :</strong>{userDetails?.description}</p>
            </div>
            </div>
      </div>
      {
            toggleRegister && (<Register toggleRegister={toggleRegister} setToggleRegister={setToggleRegister}
              editData={userDetails} editDataToggler={editDataToggler} setEditDataToggler={setEditDataToggler}
            />)
        }
    </div>
  );
};

export default DetailsPage;
