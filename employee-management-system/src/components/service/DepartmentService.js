import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

class DepartmentService{

    create = async(course)=>{
      await axios({
          method:"Post",
          url:`${API_URL}course`,
          data:course
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
                url:`${API_URL}course`
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
                url:`${API_URL}course/${code}`
            });
            return response.data
        }catch(e){
            throw e.message;
        };
        
    }
    update = async(code,course)=>{
        await axios({
            method:"PUT",
            url:`${API_URL}course/${code}`,
            data:course,
        }).catch((e)=>{
            const{message} = e.response.data;
            if(message.errorInfo) throw message.errorInfo[2];
            else throw e.message;
        });
    };
}

export default new DepartmentService();