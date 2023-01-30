import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Adminboard = () => {
  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);
  //console.log(logindata.ValidUserOne.email);
   //useNavigate는 양식이 제출되거나 특정 event가 발생할 때,  url을 조작할 수 있는 interface를 제공합니다.
  const history = useNavigate();

  const AdminboardValid = async () => {
    let token = sessionStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    });
      //가져온 response data를 json화 하여 data에 저장합니다.
      const data = await res.json();
      //console.log(data.ValidUserOne.role);

      if(data.status === 401 || !data){
        // => localStorage의 usersdatatoken을 가져와 확인하기 떄문에 만약 그것을 지우면 에러가 됨. 
        history("*");
      } else {
        setLoginData(data)
            history("/admin");
      }
  }

  useEffect(() => {
    setTimeout(() => {
      AdminboardValid();
        setData(true)
    }, )
}, [])

  return (
    <>
    {
        data ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src="./man.png" style={{ width: "200px", marginTop: 20 }} alt="" />
            <h1>Admin Email:{logindata ? logindata.ValidUserOne.email : ""}</h1>
            <h1>Admin Name:{logindata ? logindata.ValidUserOne.fname : ""}</h1>
        </div> : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
            Loading... &nbsp;
            <CircularProgress />
        </Box>
    }

</>
  )
}

export default Adminboard