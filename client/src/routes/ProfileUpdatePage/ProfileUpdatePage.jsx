import { useContext, useState } from "react";
import "./ProfileUpdatePage.scss";
import { AuthContext } from "../../context/authContext";
import {apiRequest} from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidjet from "../../components/UploadWidjet/UploadWidjet";


function ProfileUpdatePage() {
  const { currentUser, updateData } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(avatar)
    e.preventDefault();
    const formData= new FormData(e.target);
    const {username,email,password}= Object.fromEntries(formData)
    try {
       const res = await apiRequest.put(`/user/${currentUser.id}`,{username,email,password,avatar:avatar[0]});
       console.log(res.data.rest)
       updateData(res.data.rest);
    } catch (error) {
      console.log(error);
    }
  
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] ||currentUser.avatar|| "/nouser.jpg"} alt="" className="avatar"/>
        <UploadWidjet uwConfig={{
          cloudName:"tarekBenlakri",
          uploadPreset:"estate",
          multiple:false,
          folder:"avatars"
        }} setState={setAvatar}/>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;