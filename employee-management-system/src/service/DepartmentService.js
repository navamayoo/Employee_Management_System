import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

class DepartmentService{

    create = async(department)=>{
      await axios({
          method:"Post",
          url:`${API_URL}Department`,
          data:department
      }).catch((e)=>{
          const {message}= e.response.data;
          if(message.errorInfo) throw message.errorInfo[2];
          else throw e.message;
      });
    };

    getAll = async()=>{
        try{
            const response = await axios({
                method:"GET",
                url:`${API_URL}Department`
            });
            return response.data
        }catch(e){
            throw e.message;
        };
    }

    getByCode = async(code)=>{
        try{
            const response = await axios({
                method: "GET",
                url:`${API_URL}Department/${code}`
            });
            return response.data
        }catch(e){
            throw e.message;
        };
        
    }
    update = async(code,department)=>{
        await axios({
            method:"PUT",
            url:`${API_URL}Department/${code}`,
            data:department,
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
                url:`${API_URL}Department/${code}`
            });
            return response.data
        }catch(e){
            throw e.message;
        };
        
    }
}

export default new DepartmentService();