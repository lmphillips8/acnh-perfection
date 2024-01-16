import React, { useState } from 'react'
import axios from 'axios'
import { Row, Col, Container } from 'react-bootstrap'
import ls from 'local-storage'
import { useNavigate } from 'react-router'
import Flowers from '../raw-data/flowers'

export default function FlowersGrown() {
  const navigate = useNavigate()

  const [progress, setProgress] = useState(ls.get('progress'))
  axios.defaults.headers.common['X-API-KEY'] = process.env.REACT_APP_API_KEY // for all requests

  const handleClick = (item) => {
    const itemIndex = progress.flowers.grown.indexOf(item)
    if (itemIndex > -1) {
      progress.flowers.grown.splice(itemIndex, 1)
    } else {
      progress.flowers.grown.push(item)
    }
    ls.set('progress', progress)
    setProgress({ ...progress })
  }

  return (
    <div className='list '>
      <div className='title'>
        <div className='goal-title'>
          <div className='scroll'>
            <h1>Flowers</h1>
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
            {Flowers.map((item) => {
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
                        !progress.flowers.grown.includes(item.name)
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
