import React, { useEffect, useState } from 'react'
import ls from 'local-storage'
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router'
import axios from 'axios'
import HelpModal from './Help'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import './styles/main.scss'

export default function Goals() {
  axios.defaults.headers.common['X-API-KEY'] = process.env.REACT_APP_API_KEY // for all requests

  const [total, setTotal] = useState('')
  const [progress, setProgress] = useState(null)
  const [showHelp, setShowHelp] = useState(false)
  const [showPerfect, setShowPerfect] = useState(false)
  const [enterIsland, setEnterIsland] = useState(false)
  const [islandName, setIslandName] = useState('')
  const navigate = useNavigate()

  const calculateTotal = function (prog) {
    let totalPercentage = 0
    if (prog) {
      totalPercentage += prog.cooking.percentage * prog.cooking.weight
      if (prog.crown.worn) {
        totalPercentage += prog.crown.weight
      }
      totalPercentage += prog.diys.percentage * prog.diys.weight
      totalPercentage += (prog.flowers.grown.length / 54) * prog.flowers.weight
      totalPercentage += prog.friendship.percentage * prog.friendship.weight
      totalPercentage +=
        (prog.goldenTools.tools.length / 6) * prog.goldenTools.weight
      totalPercentage +=
        (prog.gyroids.collected.length / 36) * prog.gyroids.weight
      totalPercentage += prog.museum.percentage * prog.museum.weight
      totalPercentage += prog.nookMiles.percentage * prog.nookMiles.weight
    }
    if (totalPercentage >= 100 && ls.get('perfection-status') !== true) {
      ls.set('perfection-status', true)
      setShowPerfect(true)
    } else if (totalPercentage < 100 && ls.get('perfection-status') === true) {
      ls.set('perfection-status', false)
    }
    return parseFloat(totalPercentage.toFixed(2))
  }

  const handleIslandClose = () => {
    ls.set('island-name', islandName)
    setEnterIsland(false)
    setShowHelp(true)
  }

  useEffect(() => {
    let hasVisited = ls.get('perfection-status')
    if (hasVisited === null) {
      ls.set('perfection-status', false)
      setEnterIsland(true)
    }
    let lsProgress = ls.get('progress')
    if (lsProgress === null) {
      ls.set('progress', {
        museum: { percentage: 0, weight: 10, collected: [] },
        goldenTools: { count: 0, tools: [], weight: 10 },
        friendship: { friends: [], percentage: 0, weight: 10 },
        flowers: { grown: [], weight: 10 },
        diys: { percentage: 0, crafted: [], weight: 15 },
        cooking: { percentage: 0, recipesCooked: [], weight: 15 },
        gyroids: { collected: [], weight: 10 },
        nookMiles: { percentage: 0, goals: [], weight: 15 },
        crown: { worn: false, weight: 5 },
      })
    }
    setProgress({ ...lsProgress })

    let calcTotal = calculateTotal(lsProgress)
    setTotal(calcTotal)
  }, [])

  return (
    <div className='home'>
      <div
        className='help'
        onClick={() => {
          setShowHelp(true)
        }}>
        <HelpOutlineIcon />
      </div>
      <HelpModal
        show={showHelp}
        setShow={setShowHelp}
        setProgress={setProgress}
      />
      {
        <div className='perfection-tracker'>
          <h1>
            <span
              className={ls.get('perfection-status') === true ? 'perfect' : ''}>
              {ls.get('island-name')}
            </span>
            <br /> Perfection Tracker
          </h1>
          <p>----------</p>
          <p
            onClick={() => {
              navigate('/museum')
            }}>
            Museum Complete:{' '}
            {parseFloat(
              (
                (progress?.museum?.percentage
                  ? progress.museum.percentage
                  : 0) * 100
              ).toFixed(2)
            )}
            %
          </p>
          <p
            onClick={() => {
              navigate('/tools')
            }}>
            Golden Tools Owned:{' '}
            {progress?.goldenTools?.tools?.length
              ? progress.goldenTools.tools.length
              : 0}
            /6
          </p>
          <p
            onClick={() => {
              navigate('/diys')
            }}>
            Seasonal DIYs Made:{' '}
            {parseFloat(
              (
                (progress?.diys?.percentage ? progress.diys.percentage : 0) *
                100
              ).toFixed(2)
            )}
            %
          </p>
          <p
            onClick={() => {
              navigate('/cooking')
            }}>
            Cooking Recipes Made:{' '}
            {parseFloat(
              (
                (progress?.cooking?.percentage
                  ? progress.cooking.percentage
                  : 0) * 100
              ).toFixed(2)
            )}
            %
          </p>
          <p
            onClick={() => {
              navigate('/photos')
            }}>
            Great Friends:{' '}
            {parseFloat(
              (
                (progress?.friendship?.percentage
                  ? progress.friendship.percentage
                  : 0) * 100
              ).toFixed(2)
            )}
            %
          </p>
          <p
            onClick={() => {
              navigate('/nookMiles')
            }}>
            Nook Miles:{' '}
            {parseFloat(
              (
                (progress?.nookMiles?.percentage
                  ? progress.nookMiles.percentage
                  : 0) * 100
              ).toFixed(2)
            )}
            %
          </p>
          <p
            onClick={() => {
              navigate('/flowers')
            }}>
            Grow Every Flower:{' '}
            {progress?.flowers?.grown ? progress.flowers.grown.length : 0}/54
          </p>
          <p
            onClick={() => {
              navigate('/gyroids')
            }}>
            Find Every Gyroid:{' '}
            {progress?.gyroids?.collected
              ? progress.gyroids.collected.length
              : 0}
            /36
          </p>
          <p
            onClick={() => {
              navigate('/royalCrown')
            }}>
            Royal Crown Worn: {progress?.crown?.worn ? 'Yes' : 'No'}
          </p>
          <p>----------</p>
          <p>Total Complete: {total}%</p>
        </div>
      }
      <Modal
        className='perfection-modal'
        show={showPerfect}
        onHide={() => setShowPerfect(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {ls.get('island-name')} is officially perfect! Congratulations on
            completing this challenge and thank you for using my site to track
            your progress!
          </p>
        </Modal.Body>
      </Modal>
      <Modal
        className='enter-island-modal'
        show={enterIsland}
        onHide={() => setEnterIsland(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your Island Name:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input onChange={(e) => setIslandName(e.target.value)}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            className='submit-name'
            onClick={handleIslandClose}>
            Let's Go
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
