import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Container, ButtonGroup, Button } from 'react-bootstrap'
import ls from 'local-storage'
import { useNavigate } from 'react-router'
import Spinner from 'react-bootstrap/Spinner'
export default function SeasonalDIYs() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [fallDIYs, setFallDIYs] = useState([])
  const [winterDIYs, setWinterDIYs] = useState([])
  const [springDIYs, setSpringDIYs] = useState([])
  const [summerDIYs, setSummerDIYs] = useState([])
  const [eventDIYs, setEventDIYs] = useState([])
  const [selectedSeason, setSelectedSeason] = useState([])
  const [selectedName, setSelectedName] = useState('')
  const [progress, setProgress] = useState(ls.get('progress'))
  axios.defaults.headers.common['X-API-KEY'] = process.env.REACT_APP_API_KEY // for all requests
  useEffect(() => {
    const apiCalls = async () => {
      let storedRecipes = ls.get('recipes')
      let allRecipes = { data: [] }
      if (storedRecipes === null) {
        allRecipes = await axios.get('https://api.nookipedia.com/nh/recipes')
        allRecipes.data.map((rec) => {
          delete rec.url
          delete rec.sell
          delete rec.serial_id
          delete rec.recipes_to_unlock
          delete rec.materials
          delete rec.buy
          return rec
        })
        ls.set('recipes', allRecipes.data)
      } else {
        allRecipes.data = storedRecipes
      }
      let springRecipes = allRecipes.data.filter((r) => {
        return r.availability.find((a) =>
          ['spring', 'Cherry Blossom season'].includes(a.note)
        )
      })
      springRecipes.map((rec, i) => (rec.number = i))
      setSpringDIYs(springRecipes)

      let summerRecipes = allRecipes.data.filter((r) => {
        return r.availability.find((a) =>
          ['Only available during summer', 'summer'].includes(a.note)
        )
      })
      summerRecipes.map((rec, i) => (rec.number = i))
      setSummerDIYs(summerRecipes)

      let fallRecipes = allRecipes.data.filter((r) => {
        return r.availability.find((a) =>
          ['fall', 'Mushroom Season', 'Maple Leaf season'].includes(a.note)
        )
      })
      fallRecipes.map((rec, i) => (rec.number = i))
      setFallDIYs(fallRecipes)

      let winterRecipes = allRecipes.data.filter((r) => {
        return r.availability.find(
          (a) => a.from === 'Snowboy' || a.note === 'winter'
        )
      })
      winterRecipes.map((rec, i) => (rec.number = i))
      setWinterDIYs(winterRecipes)

      let eventRecipes = allRecipes.data.filter((r) => {
        return r.availability.find(
          (a) =>
            ['Turkey Day Recipes', 'Bunny Day'].includes(a.from) ||
            ['October', 'Festive Season'].includes(a.note)
        )
      })
      eventRecipes.map((rec, i) => (rec.number = i))
      setEventDIYs(eventRecipes)

      setSelectedSeason(springRecipes)
      setSelectedName('spring')
      setIsLoading(false)
    }
    apiCalls()
  }, [])

  const updateList = function (type) {
    setSelectedName(type)
    switch (type) {
      case 'fall':
        setSelectedSeason(fallDIYs)
        break
      case 'spring':
        setSelectedSeason(springDIYs)
        break
      case 'summer':
        setSelectedSeason(summerDIYs)
        break
      case 'winter':
        setSelectedSeason(winterDIYs)
        break
      case 'event':
        setSelectedSeason(eventDIYs)
        break
      default:
        setSelectedSeason([])
    }
  }

  const handleClick = (item) => {
    let totalCount =
      fallDIYs.length +
      springDIYs.length +
      summerDIYs.length +
      winterDIYs.length +
      eventDIYs.length
    const itemIndex = progress.diys.crafted.indexOf(
      `${selectedName}-${item.number}`
    )
    if (itemIndex > -1) {
      progress.diys.crafted.splice(itemIndex, 1)
      progress.diys.percentage -= 1 / totalCount
    } else {
      progress.diys.crafted.push(`${selectedName}-${item.number}`)
      progress.diys.percentage += 1 / totalCount
    }
    ls.set('progress', progress)
    setProgress({ ...progress })
  }

  return (
    <div className='list seasonal-diys'>
      <div className='title'>
        <div className='goal-title'>
          <div className='scroll'>
            <h1>DIYs</h1>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className='container loading'>
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <Container className='goal'>
          <div className='tabs'>
            <ButtonGroup vertical>
              <Button
                className={selectedName === 'spring' ? 'selected' : ''}
                onClick={() => updateList('spring')}>
                Spring
              </Button>
              <Button
                className={selectedName === 'summer' ? 'selected' : ''}
                onClick={() => updateList('summer')}>
                Summer
              </Button>
              <Button
                className={selectedName === 'fall' ? 'selected' : ''}
                onClick={() => updateList('fall')}>
                Fall
              </Button>
              <Button
                className={selectedName === 'winter' ? 'selected' : ''}
                onClick={() => updateList('winter')}>
                Winter
              </Button>
              <Button
                className={selectedName === 'event' ? 'selected' : ''}
                onClick={() => updateList('event')}>
                Events
              </Button>
            </ButtonGroup>
          </div>
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
              {Object.keys(selectedSeason)?.map((item) => {
                return (
                  <Col
                    key={selectedSeason[item].number}
                    className='diy'
                    md={2}
                    xs={6}
                    onClick={() => handleClick(selectedSeason[item])}>
                    <div className='item'>
                      <img
                        className={
                          !progress.diys.crafted.includes(
                            `${selectedName}-${selectedSeason[item].number}`
                          )
                            ? 'silhouette'
                            : ''
                        }
                        src={selectedSeason[item].image_url}
                        alt={`${selectedSeason[item].name}`}
                      />
                      <p>{selectedSeason[item].name}</p>
                    </div>
                  </Col>
                )
              })}
            </Row>
          </div>
        </Container>
      )}
    </div>
  )
}
