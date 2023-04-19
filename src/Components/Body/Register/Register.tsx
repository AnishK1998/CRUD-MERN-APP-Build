import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { registerProps, formdata, formErrors } from "../../Models/model";
import { toast } from "react-toastify";
import axios from "axios";

const Register = (props: registerProps) => {
  const [formData, setFormData] = useState<formdata>({
    id: "",
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    description: "",
  });
  const [errors, setErrors] = useState<formErrors>({});

  useEffect(() => {
    if (props.editData !== undefined && props.editDataToggler) {
      setFormData(props.editData);
    }
  }, []);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log("formData ", formData);

  const registerUser = ()=>{
    axios.post("/register", formData).then((res) => {
            toast.success("user is added sucessfully");
            setFormData({id: "",name: "", email: "", age: "",mobile: "",work: "",address: "",description: ""});
            setErrors({});
            props.setToggleRegister(!props.toggleRegister);
          })
          .catch((err) => {
            console.log("printing err ", err.response.data);
            if (err.response.data === "User already exsist") {
              toast.error("User already exsist");
            } else {
              toast.error("Error 404");
            }
          });
  }

  const updateUserData = (formData: formdata)=>{
    axios.put(`/updateUserDetails/${formData._id}`,formData).then((res) => {
      console.log("res for updatedUserDetails ",res.data)
      toast.success("user data is updated")
      props.setToggleRegister(!props.toggleRegister);
    }).catch(error => toast.error("failed to update user"))
  }

  const handleFormSubmission = (event: any) => {
    event.preventDefault();
    const ErrorValidation = validation(formData);
    
      if (Object.keys(ErrorValidation).length === 0) {
        if (!props.editDataToggler) {
          registerUser();
        
        console.log("printing formData from Submission ", formData);
      }else{
        updateUserData(formData)
      }
      } else {
        setErrors(ErrorValidation);
      }
    
  };

  const validation = (item: formdata) => {
    const error: formErrors = {};
    if (!item.name) {
      error.name = "Name is required field";
    }
    if (!item.age) {
      error.age = "Age is required field";
    }
    if (!item.address) {
      error.address = "Adress is required field";
    }
    if (!item.email) {
      error.email = "Email is required field";
    }
    if (!item.mobile) {
      error.mobile = "Mobile is required field";
    }
    if (!item.work) {
      error.work = "Work is required field";
    }
    if (!item.description) {
      error.description = "Description is required field";
    }
    return error;
  };

  return (
    <div>
      <Dialog
        open={props.toggleRegister}
        onClose={() => props.setToggleRegister(!props.toggleRegister)}
      >
        <DialogContent>
          <div className="container">
            {/* <div className="flex justify-between"> */}
            <form onSubmit={handleFormSubmission}>
              <div className="flex justify-between">
                <div>
                  <div className="my-3 mx-2">
                    <TextField
                      name="name"
                      label="Name"
                      value={formData?.name}
                      onChange={handleInputChange}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                    />
                  </div>
                  <div className="my-3 mx-2">
                    <TextField
                      name="age"
                      label="Age"
                      type="number"
                      value={formData?.age}
                      onChange={handleInputChange}
                      error={Boolean(errors.age)}
                      helperText={errors.age}
                    />
                  </div>
                  <div className="my-3 mx-2">
                    <TextField
                      name="work"
                      label="Work"
                      value={formData?.work}
                      onChange={handleInputChange}
                      error={Boolean(errors.work)}
                      helperText={errors.work}
                    />
                  </div>
                  <div className="my-3 mx-2">
                    <TextField
                      name="description"
                      label="Description"
                      multiline
                      rows={3}
                      value={formData?.description}
                      onChange={handleInputChange}
                      error={Boolean(errors.description)}
                      helperText={errors.description}
                    />
                  </div>
                </div>
                <div>
                  <div className="my-3 mx-2">
                    <TextField
                      name="email"
                      label="Email"
                      value={formData?.email}
                      onChange={handleInputChange}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                    />
                  </div>
                  <div className="my-3 mx-2">
                    <TextField
                      name="mobile"
                      label="Mobile"
                      value={formData?.mobile}
                      onChange={handleInputChange}
                      type="number"
                      error={Boolean(errors.mobile)}
                      helperText={errors.mobile}
                    />
                  </div>
                  <div className="my-3 mx-2">
                    <TextField
                      name="address"
                      label="Address"
                      value={formData?.address}
                      onChange={handleInputChange}
                      error={Boolean(errors.address)}
                      helperText={errors.address}
                    />
                  </div>
                </div>
              </div>

              <DialogActions>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </DialogActions>
            </form>
            {/* </div> */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Register;
