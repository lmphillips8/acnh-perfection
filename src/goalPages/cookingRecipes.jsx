import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Container } from 'react-bootstrap'
import ls from 'local-storage'
import { useNavigate } from 'react-router'
import Spinner from 'react-bootstrap/Spinner'
export default function CookingRecipes() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [recipeList, setRecipeList] = useState([])

  const [progress, setProgress] = useState(ls.get('progress'))
  axios.defaults.headers.common['X-API-KEY'] = process.env.REACT_APP_API_KEY // for all requests
  useEffect(() => {
    const apiCalls = async () => {
      let cookingRecipes = ls.get('cookingRecipes')
      if (cookingRecipes === null) {
        let allRecipes = await axios.get(
          'https://api.nookipedia.com/nh/recipes'
        )

        cookingRecipes = allRecipes.data.filter((r) => {
          return r.availability.find(
            (a) =>
              ([
                'restaurant',
                'Turkey Day Recipes',
                'Be a Chef! DIY Recipes+',
                'Basic Cooking Recipes',
                'fishing',
                'Daisy Mae',
                'Brewster',
              ].includes(a.from) &&
                !a.note.toLowerCase().includes('trash') &&
                !a.note.toLowerCase().includes('tire') &&
                !a.note.toLowerCase().includes('empty can') &&
                !a.note.toLowerCase().includes('boot') &&
                !a.note.toLowerCase().includes('Critterpedia') &&
                r.name !== 'stonework kitchen' &&
                r.name !== 'golden rod') ||
              r.name === 'spooky cookies'
          )
        })

        //trim data we don't need since we're going to cache it
        cookingRecipes.map((rec) => {
          delete rec.url
          delete rec.serial_id
          delete rec.sell
          delete rec.recipes_to_unlock
          delete rec.materials
          delete rec.availability
          delete rec.buy

          return rec
        })
        ls.set('cookingRecipes', cookingRecipes)
      } else {
        cookingRecipes = ls.get('cookingRecipes')
      }
      setRecipeList(cookingRecipes)

      setIsLoading(false)
    }
    apiCalls()
  }, [])

  const handleClick = (item) => {
    const itemIndex = progress.cooking.recipesCooked.indexOf(item.name)
    if (itemIndex > -1) {
      progress.cooking.recipesCooked.splice(itemIndex, 1)
      progress.cooking.percentage -= 1 / recipeList.length
    } else {
      progress.cooking.recipesCooked.push(item.name)
      progress.cooking.percentage += 1 / recipeList.length
    }
    ls.set('progress', progress)
    setProgress({ ...progress })
  }

  return (
    <div className='list'>
      <div className='title'>
        <div className='goal-title'>
          <div className='scroll'>
            <h1>Recipes</h1>
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
            <Row>
              {Object.keys(recipeList)?.map((item) => {
                return (
                  <Col
                    key={recipeList[item].number}
                    className='diy'
                    md={2}
                    xs={6}
                    onClick={() => handleClick(recipeList[item])}>
                    <div className='item'>
                      <img
                        className={
                          !progress.cooking.recipesCooked.includes(
                            recipeList[item].name
                          )
                            ? 'silhouette'
                            : ''
                        }
                        src={recipeList[item].image_url}
                        alt={`${recipeList[item].name}`}
                      />
                      <p>{recipeList[item].name}</p>
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
