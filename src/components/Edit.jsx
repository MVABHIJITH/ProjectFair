import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadImg from '../assets/add-img.jpg'
import { SERVER_URL } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectAPI } from '../services/allAPI';
import { editResponseContext } from '../Context/ContextsAPI';


function Edit({ project }) {
  const { editResponse, setEditResponse } = useContext(editResponseContext)
  const [projectData, setProjectData] = useState({
    id: project?._id, title: project?.title, language: project?.language, overview: project?.overview, github: project?.github, website: project?.website, projectImage: ""
  })
  const [preview, setPreview] = useState("")

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (projectData.projectImage) {
      setPreview(URL.createObjectURL(projectData.projectImage))
    } else {
      setPreview("")
    }
  }, [projectData.projectImage])

  const handleClose = () => {
    setShow(false);
    setProjectData({ id: project?._id, title: project?.title, language: project?.language, overview: project?.overview, github: project?.github, website: project?.website, projectImage: "" })
    setPreview("")
  }
  const handleShow = () => {
    setShow(true);
    setProjectData({ id: project?._id, title: project?.title, language: project?.language, overview: project?.overview, github: project?.github, website: project?.website, projectImage: "" })
  }

  const handleUpdateProject = async () => {
    const { title, language, overview, github, website } = projectData
    if (!title || !language || !overview || !github || !website) {
      toast.warning("please fill the form completely")
    } else {
      // procced api call
      const reqbBody = new FormData()
      reqbBody.append("title", title)
      reqbBody.append("language", language)
      reqbBody.append("overview", overview)
      reqbBody.append("github", github)
      reqbBody.append("website", website)
      preview ? reqbBody.append("projectImage", projectImage) : reqbBody.append("projectImage", project.projectImage)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }
        // api call
        try {
          const result = await editProjectAPI(projectData.id, reqbBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            handleClose()
            //  pass response view
            setEditResponse(result)
          } else {
            console.log(result.response);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  return (
    < >
      <button onClick={handleShow} className='btn'><i className="fa-solid fa-edit"></i></button>

      <Modal size='lg' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4">
              <label>
                <input onChange={e => setProjectData({ ...projectData, projectImage: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                <img height={'200px'} className='img-fluid' src={preview ? preview : `${SERVER_URL}/uploads/${project?.projectImage}`} alt="" />
              </label>
            </div>
            <div className="col-lg-8 py-3">
              <div className='mb-3'>
                <input value={projectData.title} onChange={e => setProjectData({ ...projectData, title: e.target.value })} type="text" className='form-control' placeholder='Project title' />
              </div>

              <div className='mb-3'>
                <input value={projectData.language} onChange={e => setProjectData({ ...projectData, language: e.target.value })} type="text" className='form-control' placeholder='Language Used in the Projects' />
              </div>

              <div className='mb-3'>
                <input value={projectData.github} onChange={e => setProjectData({ ...projectData, github: e.target.value })} type="text" className='form-control' placeholder='Project GITHUb Link' />
              </div>

              <div className='mb-3'>
                <input value={projectData.website} onChange={e => setProjectData({ ...projectData, website: e.target.value })} type="text" className='form-control' placeholder='Project WEBSITELink' />
              </div>

              <div className='mb-3'>
                <input value={projectData.overview} onChange={e => setProjectData({ ...projectData, overview: e.target.value })} type="text" className='form-control' placeholder='Project Overview' />
              </div>

            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProject} variant="primary">Edit</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Edit