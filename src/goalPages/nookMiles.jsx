import React, { useState } from 'react'
import axios from 'axios'
import { Row, Col, Container } from 'react-bootstrap'
import ls from 'local-storage'
import Achievements from '../raw-data/achievements'
import { useNavigate } from 'react-router'
import TogethernessStamp from '../assets/togetherness-stamp.png'
import IslandResidentStamp from '../assets/island-resident-stamp.png'
import FishShellsStamp from '../assets/fish-stamp.png'
import BugsStamp from '../assets/bugs-stamp.png'
import DIYStamp from '../assets/diy-stamp.png'
import SeaCreaturesStamp from '../assets/sea-creatures-stamp.png'
import CookingStamp from '../assets/cooking-stamp.png'
import ToolsStamp from '../assets/tools-stamp.png'
import GoldenToolsStamp from '../assets/tools-golden_net-stamp.png'
import PlantsStamp from '../assets/plants-apple_tree-stamp.png'
import ShrubsStamp from '../assets/plants-shrub-stamp.png'
import CropsStamp from '../assets/crops-stamp.png'
import NookPhoneStamp from '../assets/nookphone-stamp.png'
import BellsStamp from '../assets/bells-stamp.png'
import MisadventuresStamp from '../assets/misadventures-stamp.png'
import ExteriorStamp from '../assets/exterior-stamp.png'
import CustomDesignStamp from '../assets/custom-design-stamp.png'
import IconsStamp from '../assets/exterior-island_flag-stamp.png'
import IslandDesigner from '../assets/exterior-designer_path-stamp.png'
export default function NookMiles() {
  const navigate = useNavigate()

  const [progress, setProgress] = useState(ls.get('progress'))
  axios.defaults.headers.common['X-API-KEY'] = process.env.REACT_APP_API_KEY // for all requests

  const handleClick = (item) => {
    const itemIndex = progress.nookMiles.goals.indexOf(item)
    if (itemIndex > -1) {
      progress.nookMiles.goals.splice(itemIndex, 1)
      progress.nookMiles.percentage -= 1 / Achievements.length
    } else {
      progress.nookMiles.goals.push(item)
      progress.nookMiles.percentage += 1 / Achievements.length
    }
    ls.set('progress', progress)
    setProgress({ ...progress })
  }

  const getImgUrl = (category) => {
    switch (category) {
      case 'Island Resident':
        return IslandResidentStamp
      case 'Togetherness':
        return TogethernessStamp
      case 'Fish & Shells':
        return FishShellsStamp
      case 'Bugs':
        return BugsStamp
      case 'NookPhone':
        return NookPhoneStamp
      case 'Bells':
        return BellsStamp
      case 'Sea Creatures':
        return SeaCreaturesStamp
      case 'Exterior':
        return ExteriorStamp
      case 'Misadventures':
        return MisadventuresStamp
      case 'DIY':
        return DIYStamp
      case 'Cooking':
        return CookingStamp
      case 'Tools':
        return ToolsStamp
      case 'Golden Tools':
        return GoldenToolsStamp
      case 'Plants':
        return PlantsStamp
      case 'Shrubs':
        return ShrubsStamp
      case 'Crops':
        return CropsStamp
      case 'Custom Design':
        return CustomDesignStamp
      case 'Icons':
        return IconsStamp
      case 'Island Designer':
        return IslandDesigner
      default:
        break
    }
  }

  return (
    <div className='list'>
      <div className='title'>
        <div className='goal-title'>
          <div className='scroll'>
            <h1>Nook Miles</h1>
          </div>
        </div>
      </div>

      {
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
              {Achievements.map((item) => {
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
                          !progress.nookMiles.goals.includes(item.name)
                            ? 'silhouette'
                            : ''
                        }
                        src={getImgUrl(item.category)}
                        alt={`${item.name}`}
                      />
                      <p>
                        {item.name.replace(
                          '(island name)',
                          ls.get('island-name')
                        )}
                      </p>
                    </div>
                  </Col>
                )
              })}
            </Row>
          </div>
        </Container>
      }
    </div>
  )
}
