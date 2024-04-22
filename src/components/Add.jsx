import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadImg from '../assets/add-img.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addResponseContext } from '../Context/ContextsAPI';


function Add() {
  const { addresponse, setAddResponse } = useContext(addResponseContext)

  const [preview, setPreview] = useState("")
  const [imageFileStatus, setImageFileStatus] = useState(false)

  const [projectDetailes, setProjectDetailes] = useState({
    title: "", language: "", overview: "", github: "", website: "", projectImage: ""
  })
   const [show, setShow] = useState(false);
console.log(projectDetailes);
  const handleClose = () => {
    setShow(false);
    setProjectDetailes({ title: "", language: "", overview: "", github: "", website: "", projectImage: "" })
  }
  const handleShow = () => setShow(true);

  console.log(projectDetailes);

  useEffect(() => {
    if (projectDetailes.projectImage.type == "image/png" || projectDetailes.projectImage.type == "image/jpg" || projectDetailes.projectImage.type == "image/jpeg") {
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetailes.projectImage))
    } else {
      setPreview(uploadImg)
      setImageFileStatus(false)
      setProjectDetailes({
        ...projectDetailes, projectImage: ""
      })
    }
  }, [projectDetailes.projectImage])

  const handleUploadProject = async () => {
    const { title, language, overview, github, website, projectImage } = projectDetailes
    if (!title || !language || !overview || !github || !website || !projectImage) {
      toast.warning("please fill the form completely!!")
    } else {
      const reqbBody = new FormData()
      reqbBody.append("title", title)
      reqbBody.append("language", language)
      reqbBody.append("overview", overview)
      reqbBody.append("github", github)
      reqbBody.append("website", website)
      reqbBody.append("projectImage", projectImage)

      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        // api call
        try {
          const result = await addProjectAPI(reqbBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
             setAddResponse(result)
            handleClose()
          } else {
            toast.warning(result.response.data)
          }

        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  return (
    < >
      <button onClick={handleShow} className='btn'> Add New <i className="fa-solid fa-plus"></i></button>

      <Modal size='lg' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4">
              <label>
                <input type="file" style={{ display: 'none' }} onChange={e => setProjectDetailes({ ...projectDetailes, projectImage: e.target.files[0] })} />
                <img height={'200px'} className='img-fluid' src={preview} alt="" />
              </label>
              {!imageFileStatus && <div className='text-danger'><b>*Upload only following file type (png,jpg,jpeg) here !!</b></div>
              }
            </div>
            <div className="col-lg-8 py-3">
              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Project title' value={projectDetailes.title} onChange={(e) => setProjectDetailes({ ...projectDetailes, title: e.target.value })} />
              </div>

              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Language Used in the Projects' value={projectDetailes.language} onChange={(e) => setProjectDetailes({ ...projectDetailes, language: e.target.value })} />
              </div>

              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Project GITHUB Link' value={projectDetailes.github} onChange={(e) => setProjectDetailes({ ...projectDetailes, github: e.target.value })} />
              </div>

              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Project WEBSITE Link' value={projectDetailes.website} onChange={(e) => setProjectDetailes({ ...projectDetailes, website: e.target.value })} />
              </div>
              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='project Overview' value={projectDetailes.overview} onChange={(e) => setProjectDetailes({ ...projectDetailes, overview: e.target.value })} />
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUploadProject}>Upload</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Add