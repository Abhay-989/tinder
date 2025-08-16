import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import  {useAuthStore} from './useAuthStore';
export const useUserStore =create((set)=>({
    loading:false,

    updateProfile:async (data)=>{
        try {
            set({loading:true});
          const res = await axiosInstance.put("/users.update",data);
          useAuthStore.getState().setAuthUser(res.data.user);
            toast.success("Profile Update Successfully");
        } catch (error) {
            toast.error(error.respond.data.message || "Something went wrong");
        }finally{
            set({loading:false});
        }
    },
}));
