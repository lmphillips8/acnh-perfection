import React, { useState } from 'react'
import axios from 'axios'
import { Row, Col, Container } from 'react-bootstrap'
import ls from 'local-storage'
import { useNavigate } from 'react-router'
import Gryoids from '../raw-data/gyroids'

export default function GryoidsCollected() {
  const navigate = useNavigate()

  const [progress, setProgress] = useState(ls.get('progress'))
  axios.defaults.headers.common['X-API-KEY'] = process.env.REACT_APP_API_KEY // for all requests

  const handleClick = (item) => {
    const itemIndex = progress.gyroids.collected.indexOf(item)
    if (itemIndex > -1) {
      progress.gyroids.collected.splice(itemIndex, 1)
    } else {
      progress.gyroids.collected.push(item)
    }
    ls.set('progress', progress)
    setProgress({ ...progress })
  }

  return (
    <div className='list'>
      <div className='title'>
        <div className='goal-title'>
          <div className='scroll'>
            <h1>Gyroids</h1>
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
        <div className='items'>
          <Row>
            {Gryoids.map((item) => {
              return (
                <Col
                  key={item.number}
                  className='diy'
                  md={2}
                  xs={6}
                  onClick={() => handleClick(item.name)}>
                  <div className='item'>
                    <img
                      className={
                        !progress.gyroids.collected.includes(item.name)
                          ? 'silhouette'
                          : ''
                      }
                      src={item.image_url}
                      alt={`${item.name}`}
                    />
                    <p>{item.name}</p>
                  </div>
                </Col>
              )
            })}
          </Row>
        </div>
      </Container>
    </div>
  )
}
