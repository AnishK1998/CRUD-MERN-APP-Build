export interface registerProps {
    toggleRegister: boolean;
    setToggleRegister: React.Dispatch<React.SetStateAction<boolean>>;
    editData: formdata | undefined;
    editDataToggler: boolean;
    setEditDataToggler: React.Dispatch<React.SetStateAction<boolean>>
  }

export interface formdata{
  id: string | number;
  _id?: string;
  name: string;
  email: string;
  age: number | string;
  mobile: number | string;
  work: string;
  address: string;
  description: string;
}

export interface formErrors {
  _id?: string;
  name?: string;
  email?: string;
  age?: string;
  mobile?: string;
  work?: string;
  address?: string;
  description?: string;
}

export interface navbarProps {
  
}
