import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap';
import ProfileImg from '../assets/profile.png'
import { SERVER_URL } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { upadateUserAPI } from '../services/allAPI';

function Profile() {
  const [preview, setPreview] = useState("")
  const [existingImg, setExistingImg] = useState("")
  const [userDetails, setUserDeatils] = useState({
    username: "", email: "", password: "", github: "", linkedin: "", profileImage: ""
  })
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const existingUserDetails = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDeatils({
        ...userDetails, username: existingUserDetails.username, email: existingUserDetails.email, password: existingUserDetails.password, github: existingUserDetails.github, linkedin: existingUserDetails.linkedin
      })
      setExistingImg(existingUserDetails.profile)
    }
  }, [open])

  useEffect(() => {
    if (userDetails.profileImage) {
      setPreview(URL.createObjectURL(userDetails.profileImage))
    } else {
      setPreview("")
    }
  }, [userDetails.profileImage])

  const handleUserprofile = async () => {
    const { username, email, password, github, linkedin, profileImage } = userDetails
    if (!github || !linkedin) {
      toast.warning("Please fill the form completely")
    } else {
      const reqbBody = new FormData()
      reqbBody.append("username", username)
      reqbBody.append("email", email)
      reqbBody.append("password", password)
      reqbBody.append("github", github)
      reqbBody.append("linkedin", linkedin)
      preview ? reqbBody.append("profileImage", profileImage) : reqbBody.append("profileImage", existingImg)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }
        // api call
        try {
          const result = await upadateUserAPI(reqbBody, reqHeader)
          if (result.status == 200) {
            setOpen(!open)
            sessionStorage.setItem("existinguser", JSON.stringify(result.data))
          }
          else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }


  return (
    < >
      <div className="d-flex justify-content-center">
        <h3 className='text-warning'> User Profile</h3>
        <button onClick={() => setOpen(!open)} className='btn'><i className="fa-solid fa-angle-down"></i></button>
      </div>
      <Collapse in={open}>
        <div className='row justify-content-center mt-3 shadow' id="example-collapse-text">
          <label className='text-center mb-2'>
            <input onChange={e => setUserDeatils({ ...userDetails, profileImage: e.target.files[0] })} type="file" style={{ display: 'none' }} />
            {
              existingImg == "" ?
                <img width={'200px'} height={'200px'} className='rounded-circle' src={preview ? preview : ProfileImg} alt="" />
                :
                <img width={'200px'} height={'200px'} className='rounded-circle' src={preview ? preview : `${SERVER_URL}/uploads/${existingImg}`} alt="" />
            }
          </label>

          <div className="mb-2">
            <input value={userDetails.github} onChange={e => setUserDeatils({ ...userDetails, github: e.target.value })} type="text" className='form-control' placeholder='GITHUB URL' />
          </div>
          <div className="mb-2">
            <input value={userDetails.linkedin} onChange={e => setUserDeatils({ ...userDetails, linkedin: e.target.value })} type="text" className='form-control' placeholder=' LIKEDIN URL' />
          </div>
          <div className=" mb-2 d-grid">
            <button onClick={handleUserprofile} className='btn btn-warning'>Update profile</button>
          </div>
        </div>

      </Collapse>

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Profile