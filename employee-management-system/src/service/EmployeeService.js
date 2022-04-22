import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class EmployeeService{

    create = async(employee)=>{
        await axios({
            method:"POST",
            url: `${API_URL}Employee`,
            data:employee
        }).catch((e)=>{
            const {message}= e.response.data;
            if(message.errorInfo) throw message.errorInfo[2];
            else throw e.message;
        });
    };

    getAll = async()=>{
        try{
            const response = await axios({
                 method:"get",
                 url: `${API_URL}Employee`
            });
            return response.data;

        }catch(e){
            throw e.message;
        };
    }

    getByCode = async(code)=>{
        try{
            const response = await axios({
                method: "GET",
                url:`${API_URL}Employee/${code}`
            });
            return response.data
        }catch(e){
            throw e.message;
        };
        
    }
    update = async(code,employee)=>{
        await axios({
            method:"PUT",
            url:`${API_URL}Employee/${code}`,
            data:employee,
        }).catch((e)=>{
            const{message} = e.response.data;
            if(message.errorInfo) throw message.errorInfo[2];
            else throw e.message;
        });
    };
    delete = async(code)=>{
        try{
            const response = await axios({
                method: "DELETE",
                url:`${API_URL}Employee/${code}`
            });
            return response.data
        }catch(e){
            throw e.message;
        };
        
    }

}

export default new EmployeeService();