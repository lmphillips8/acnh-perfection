import React, { useState } from 'react'

import { Row, Col, Container } from 'react-bootstrap'
import ls from 'local-storage'
import { useNavigate } from 'react-router'
import RoyalCrown from '../assets/royal-crown.png'

export default function RoyalCrownWorn() {
  const navigate = useNavigate()

  const [progress, setProgress] = useState(ls.get('progress'))

  const handleClick = function (event) {
    progress.crown.worn = !progress.crown.worn
    ls.set('progress', progress)
    setProgress({ ...progress })
  }

  return (
    <div className='list golden-tools'>
      <div className='title'>
        <div className='goal-title'>
          <div className='scroll'>
            <h1>Royal Crown</h1>
          </div>
        </div>
      </div>
      <Container className='goal'>
        <div className='back-to-tracker'>
          <p
            className='d-none d-md-block'
            onClick={() => {
              navigate('/')
            }}>
            &lt; Back to All Goals
          </p>
          <p
            className='d-md-none small-back'
            onClick={() => {
              navigate('/')
            }}>
            &lt; Back
          </p>
        </div>
        <Row className='items'>
          <Col md={12} className='tool' onClick={() => handleClick()}>
            <div className='item'>
              <img
                className={!progress.crown.worn ? 'silhouette' : ''}
                src={RoyalCrown}
                alt={`Royal Crown`}
                style={{ height: '300px' }}
              />
              <p>Wear the Royal Crown</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
