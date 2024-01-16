import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Container } from 'react-bootstrap'
import ls from 'local-storage'
import { useNavigate } from 'react-router'
import Spinner from 'react-bootstrap/Spinner'
import { Autocomplete, createFilterOptions } from '@mui/material'
import TextField from '@mui/material/TextField'
import TenHearts from '../assets/ten-hearts.png'
export default function Friendship() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [allVillagers, setAllVillagers] = useState([])
  const [progress, setProgress] = useState(ls.get('progress'))

  axios.defaults.headers.common['X-API-KEY'] = process.env.REACT_APP_API_KEY // for all requests
  useEffect(() => {
    const apiCalls = async () => {
      let villagers = ls.get('villagers')
      if (villagers === null) {
        let villagersResponse = await axios.get(
          'https://api.nookipedia.com/nh/photos'
        )

        //trim data we don't need since we're going to cache it
        let villagers = villagersResponse.data.filter(
          (v) => v.category === 'Photos'
        )
        villagers.map((rec) => {
          rec.image_url = rec.variations[0].image_url
          delete rec.url
          delete rec.category
          delete rec.hha_base
          delete rec.sell
          delete rec.customizable
          delete rec.custom_kits
          delete rec.custom_body_part
          delete rec.interactable
          delete rec.version_added
          delete rec.unlocked
          delete rec.grid_width
          delete rec.grid_length
          delete rec.buy
          delete rec.availability
          delete rec.variations

          return rec
        })

        ls.set('villagers', villagers)
        setAllVillagers(villagers)
      } else {
        villagers = ls.get('villagers')
        setAllVillagers(villagers)
      }

      setIsLoading(false)
    }
    apiCalls()
  }, [])

  const addVillagerPhoto = (event, villager) => {
    const foundVillager = progress.friendship?.friends.find(
      (f) => f.name === villager.name
    )
    if (foundVillager) {
      return
    } else {
      progress.friendship?.friends?.push(villager)
      progress.friendship?.friends.sort((a, b) => a.name.localeCompare(b.name))
      progress.friendship.percentage += 1 / 34
    }
    if (progress.friendship.percentage > 1) {
      progress.friendship.percentage = 1
    }

    ls.set('progress', progress)
    setProgress({ ...progress })
  }
  const handleClick = (item) => {
    const itemIndex = progress.friendship?.friends.indexOf(item)
    if (itemIndex > -1) {
      progress.friendship?.friends.splice(itemIndex, 1)
      progress.friendship.percentage -= 1 / 34
    } else {
      progress.friendship?.friends.push(item)
      progress.friendship.percentage += 1 / 34
    }
    ls.set('progress', progress)
    setProgress({ ...progress })
  }

  const OPTIONS_LIMIT = 10
  const defaultFilterOptions = createFilterOptions()

  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT)
  }

  return (
    <div className='list friendship'>
      <div className='title'>
        <div className='goal-title'>
          <div className='scroll'>
            <h1>Photos</h1>
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
            <div className='search-bar'>
              <Autocomplete
                filterOptions={filterOptions}
                getOptionLabel={(option) => option.name}
                options={allVillagers}
                onChange={addVillagerPhoto}
                renderInput={(params) => (
                  <TextField {...params} label='Villager Name' />
                )}
              />
            </div>
            <Row>
              {progress.friendship?.friends?.map((item) => {
                return (
                  <>
                    <Col
                      key={item.name}
                      className='border-display'
                      xs={5}
                      md={5}>
                      <div className='item'>
                        <img
                          src={item.image_url}
                          alt={item.name}
                          onClick={() => handleClick(item)}
                        />
                        <p>{item.name.split("'")[0]}</p>
                      </div>
                    </Col>
                    <Col xs={7} md={7} className='hearts border-display'>
                      <img
                        className='ten-hearts'
                        src={TenHearts}
                        alt='ten hearts'
                      />
                    </Col>
                  </>
                )
              })}
            </Row>
          </div>
        </Container>
      )}
    </div>
  )
}
