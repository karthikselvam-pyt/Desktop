import { useContext } from "react";
import { userContext } from "../context/userContext";

const TotalUser = () => {
  const userData = useContext(userContext);
  return (
    <div className="w-full h-24 flex items-center justify-center bg-green-100">
      <div className="rounded-lg  bg-white h-1/2 w-1/4 flex items-center justify-center">
        <h1 className="font-bold">Total User : {userData?.totalUserCount} </h1>
      </div>
    </div>
  );
};

export default TotalUser;
