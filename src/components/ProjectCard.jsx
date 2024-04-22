import React, { useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import { SERVER_URL } from '../services/serverUrl';

function ProjectCard({displayData}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card onClick={handleShow} style={{ width: '18rem' }}> 
        <Card.Img width={"200px"} height={'180px'} variant="top" src={`${SERVER_URL}/uploads/${displayData?.projectImage}`}/>
        <Card.Body>
          <Card.Title>{displayData?.title}</Card.Title>

        </Card.Body>
      </Card>

      <Modal size='lg' show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6"><img width={"200px"} height={'100px'} className='img-fluid' src={`${SERVER_URL}/uploads/${displayData?.projectImage}`}></img></div>
            <div className="col-lg-6 ">
              <h3>{displayData?.title}</h3>
              <h6><span className='fw-bolder'>Language used:</span>{displayData?.language}</h6>
              <p style={{ textAlign: 'justify' }}><span className='fw-bolder'>Description:</span>{displayData?.overview} </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="float-start mt-2 me-auto ">
            <a href={displayData?.github} target='_blank'>  <i class="fa-brands fa-github fa-2x"></i></a>
            <a href={displayData?.website} target='_blank' className='ms-2'> <i class="fa-solid fa-link fa-2x"></i></a>

          </div>
        </Modal.Footer>
      </Modal>


    </>
  )
}

export default ProjectCard
