import React, {useState} from "react";
import {styled, alpha,InputBase} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import { formdata, navbarProps } from "../Models/model";

const Navbar = (pops : navbarProps) => {
  // const [inputValue , setInputValue] = useState("")
  // const handleInput = (event: any) => {
  //   console.log(event?.target.value);
  //   setInputValue(event?.target.value);
  // };
  // const Search = styled('div')(({ theme }) => ({
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.black, 0.15),
  //   '&:hover': {
  //     backgroundColor: alpha(theme.palette.common.black, 0.25),
  //   },
  //   marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(1),
  //     width: 'auto',
  //   },
  // }));
  
  // const SearchIconWrapper = styled('div')(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }));
  
  // const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   color: 'inherit',
  //   '& .MuiInputBase-input': {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     transition: theme.transitions.create('width'),
  //     width: '100%',
  //     [theme.breakpoints.up('sm')]: {
  //       width: '12ch',
  //       '&:focus': {
  //         width: '20ch',
  //       },
  //     },
  //   },
  // }));

  return (
    <div className="w-full bg-slate-50 drop-shadow-lg">
      <div className="md:flex md:justify-between mx-8 items-center">
        <div className="md:flex py-3">
          <p className="mx-8 text-lg font-medium text-slate-900">PlayCode</p>
          <NavLink to={"/"} className="text-lg font-medium text-slate-500 cursor-pointer">Home</NavLink>
        </div>
        {/* <div className="py-3">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search"}}
              onChange={(e) => handleInput(e)}
            />
          </Search>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
