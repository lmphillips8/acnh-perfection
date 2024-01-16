import React, { useState } from 'react'

import { Row, Col, Container } from 'react-bootstrap'
import ls from 'local-storage'
import { useNavigate } from 'react-router'
import GoldenSlingshot from '../assets/golden-slingshot.png'
import GoldenRod from '../assets/golden-rod.png'
import GoldenNet from '../assets/golden-net.png'
import GoldenAxe from '../assets/golden-axe.png'
import GoldenShovel from '../assets/golden-shovel.png'
import GoldenCan from '../assets/golden-can.png'

export default function GoldenTools() {
  const navigate = useNavigate()

  const [progress, setProgress] = useState(ls.get('progress'))

  const handleClick = (item) => {
    const itemIndex = progress.goldenTools.tools.indexOf(item)
    if (itemIndex > -1) {
      progress.goldenTools.tools.splice(itemIndex, 1)
      progress.goldenTools.count -= 1
    } else {
      progress.goldenTools.tools.push(item)
      progress.goldenTools.count += 1
    }

    ls.set('progress', progress)
    setProgress({ ...progress })
  }

  return (
    <div className='list golden-tools'>
      <div className='title'>
        <div className='goal-title'>
          <div className='scroll'>
            <h1>Golden Tools</h1>
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
          <Col md={4} className='tool' onClick={() => handleClick('net')}>
            <div className='item'>
              <img
                className={
                  !progress.goldenTools.tools.includes('net')
                    ? 'silhouette'
                    : ''
                }
                src={GoldenNet}
                alt={`Golden Net`}
              />
              <p>Net</p>
            </div>
          </Col>{' '}
          <Col md={4} className='tool' onClick={() => handleClick('shovel')}>
            <div className='item'>
              <img
                className={
                  !progress.goldenTools.tools.includes('shovel')
                    ? 'silhouette'
                    : ''
                }
                src={GoldenShovel}
                alt={`Golden Shovel`}
              />
              <p>Shovel</p>
            </div>
          </Col>
          <Col md={4} className='tool' onClick={() => handleClick('axe')}>
            <div className='item'>
              <img
                className={
                  !progress.goldenTools.tools.includes('axe')
                    ? 'silhouette'
                    : ''
                }
                src={GoldenAxe}
                alt={`Golden Axe`}
              />
              <p>Axe</p>
            </div>
          </Col>
          <Col md={4} className='tool' onClick={() => handleClick('rod')}>
            <div className='item'>
              <img
                className={
                  !progress.goldenTools.tools.includes('rod')
                    ? 'silhouette'
                    : ''
                }
                src={GoldenRod}
                alt={`Golden Fishing Rod`}
              />
              <p>Fishing Rod</p>
            </div>
          </Col>{' '}
          <Col md={4} className='tool' onClick={() => handleClick('can')}>
            <div className='item'>
              <img
                className={
                  !progress.goldenTools.tools.includes('can')
                    ? 'silhouette'
                    : ''
                }
                src={GoldenCan}
                alt={`Golden Can`}
              />
              <p>Watering Can</p>
            </div>
          </Col>
          <Col md={4} className='tool' onClick={() => handleClick('slingshot')}>
            <div className='item'>
              <img
                className={
                  !progress.goldenTools.tools.includes('slingshot')
                    ? 'silhouette'
                    : ''
                }
                src={GoldenSlingshot}
                alt={`Golden Slingshot`}
              />
              <p>Slingshot</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
