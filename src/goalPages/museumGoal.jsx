import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Container, ButtonGroup, Button } from 'react-bootstrap'
import Fossils from '../raw-data/fossils'
import ls from 'local-storage'
import { useNavigate } from 'react-router'
import Spinner from 'react-bootstrap/Spinner'
export default function MuseumGoal() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [fishList, setFishList] = useState([])
  const [bugList, setBugList] = useState([])
  const [fossilList, setFossilList] = useState([])
  const [artList, setArtList] = useState([])
  const [seaCreatureList, setSeaCreatureList] = useState([])
  const [selectedList, setSelectedList] = useState([])
  const [selectedName, setSelectedName] = useState('')
  const [progress, setProgress] = useState(ls.get('progress'))
  axios.defaults.headers.common['X-API-KEY'] = process.env.REACT_APP_API_KEY // for all requests
  useEffect(() => {
    const apiCalls = async () => {
      if (ls.get('fish') === null) {
        let fishAPI = await axios.get('https://api.nookipedia.com/nh/fish')
        fishAPI.data.map((rec) => {
          delete rec.URL
          delete rec.render_URL
          delete rec.locationURL
          delete rec.shadow_sizeURL
          delete rec.rarityURL
          delete rec.total_catchURL
          delete rec.sell_nookURL
          delete rec.sell_cjURL
          delete rec.tank_widthURL
          delete rec.tank_lengthURL
          delete rec.catchphrasesURL
          delete rec.north
          delete rec.south
          return rec
        })
        ls.set('fish', fishAPI.data)
        setFishList(fishAPI.data)
        setSelectedList(fishAPI.data)
        setSelectedName('fish')
      } else {
        setFishList(ls.get('fish'))
        setSelectedList(ls.get('fish'))
        setSelectedName('fish')
      }
      if (ls.get('bugs') === null) {
        let bugAPI = await axios.get('https://api.nookipedia.com/nh/bugs')
        bugAPI.data.map((rec) => {
          delete rec.url
          delete rec.render_url
          delete rec.location
          delete rec.rarity
          delete rec.total_catch
          delete rec.sell_nook
          delete rec.sell_flick
          delete rec.tank_width
          delete rec.tank_length
          delete rec.catchphrases
          delete rec.north
          delete rec.south

          return rec
        })
        ls.set('bugs', bugAPI.data)

        setBugList(bugAPI.data)
      } else {
        setBugList(ls.get('bugs'))
      }
      if (ls.get('art') === null) {
        let artAPI = await axios.get('https://api.nookipedia.com/nh/art')

        artAPI.data.map((rec, i) => {
          rec.number = i

          delete rec.url
          delete rec.has_fake
          delete rec.art_name
          delete rec.art_type
          delete rec.author
          delete rec.year
          delete rec.art_style
          delete rec.buy
          delete rec.sell
          delete rec.availability
          delete rec.width
          delete rec.length
          delete rec.texture_url
          delete rec.description

          delete rec.fake_info

          return rec
        })
        ls.set('art', artAPI.data)
        setArtList(artAPI.data)
      } else {
        setArtList(ls.get('art'))
      }

      setFossilList(Fossils)
      if (ls.get('seaCreatures') === null) {
        let seaCreatureAPI = await axios.get(
          'https://api.nookipedia.com/nh/sea'
        )
        seaCreatureAPI.data.map((rec) => {
          delete rec.url
          delete rec.render_url
          delete rec.shadow_size
          delete rec.shadow_movement
          delete rec.rarity
          delete rec.total_catch
          delete rec.sell_nook
          delete rec.tank_width
          delete rec.tank_length
          delete rec.catchphrases
          return rec
        })
        ls.set('seaCreatures', seaCreatureAPI.data)
        setSeaCreatureList(seaCreatureAPI.data)
      } else {
        setSeaCreatureList(ls.get('seaCreatures'))
      }

      setIsLoading(false)
    }
    apiCalls()
  }, [])

  const updateList = function (type) {
    setSelectedName(type)
    switch (type) {
      case 'fish':
        setSelectedList(fishList)
        break
      case 'bug':
        setSelectedList(bugList)
        break
      case 'art':
        setSelectedList(artList)
        break
      case 'sea':
        setSelectedList(seaCreatureList)
        break
      case 'fossil':
        setSelectedList(fossilList)
        break
      default:
        setSelectedList([])
    }
  }

  const handleClick = (item) => {
    let allItemLength =
      fishList.length +
      bugList.length +
      fossilList.length +
      artList.length +
      seaCreatureList.length
    const itemIndex = progress.museum.collected.indexOf(
      `${selectedName}-${item.number}`
    )
    if (itemIndex > -1) {
      progress.museum.collected.splice(itemIndex, 1)
      progress.museum.percentage -= 1 / allItemLength
    } else {
      progress.museum.collected.push(`${selectedName}-${item.number}`)
      progress.museum.percentage += 1 / allItemLength
    }

    ls.set('progress', progress)

    setProgress({ ...progress })
  }

  return (
    <div className='list museum'>
      <div className='title'>
        <div className='goal-title'>
          <div className='scroll'>
            <h1>Museum</h1>
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
                className={selectedName === 'fish' ? 'selected' : ''}
                onClick={() => updateList('fish')}>
                Fish
              </Button>
              <Button
                className={selectedName === 'bug' ? 'selected' : ''}
                onClick={() => updateList('bug')}>
                Insects
              </Button>
              <Button
                className={selectedName === 'sea' ? 'selected' : ''}
                onClick={() => updateList('sea')}>
                Sea Creatures
              </Button>
              <Button
                className={selectedName === 'fossil' ? 'selected' : ''}
                onClick={() => updateList('fossil')}>
                Fossils
              </Button>
              <Button
                className={selectedName === 'art' ? 'selected' : ''}
                onClick={() => updateList('art')}>
                Art
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
          <Row className='items'>
            {Object.keys(selectedList)?.map((item) => {
              return (
                <Col
                  key={selectedList[item].number}
                  md={2}
                  xs={6}
                  onClick={() => handleClick(selectedList[item])}>
                  <div className='item'>
                    <img
                      className={
                        !progress.museum.collected.includes(
                          `${selectedName}-${selectedList[item].number}`
                        )
                          ? 'silhouette'
                          : ''
                      }
                      src={
                        selectedName === 'art'
                          ? selectedList[item].real_info.image_url
                          : selectedList[item].image_url
                      }
                      alt={`${selectedList[item].name}`}
                    />
                    <p>
                      {selectedName === 'fossil'
                        ? selectedList[item].group
                        : selectedList[item].name}
                    </p>
                  </div>
                </Col>
              )
            })}
          </Row>
        </Container>
      )}
    </div>
  )
}
