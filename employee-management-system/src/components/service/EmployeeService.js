import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class EmployeeService{

    create = async(student)=>{
        await axios({
            method:"POST",
            url: `${API_URL}student`,
            data:student
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
                 url: `${API_URL}student`
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
                url:`${API_URL}student/${code}`
            });
            return response.data
        }catch(e){
            throw e.message;
        };
        
    }
    update = async(code,student)=>{
        await axios({
            method:"PUT",
            url:`${API_URL}student/${code}`,
            data:student,
        }).catch((e)=>{
            const{message} = e.response.data;
            if(message.errorInfo) throw message.errorInfo[2];
            else throw e.message;
        });
    };

}

export default new EmployeeService();