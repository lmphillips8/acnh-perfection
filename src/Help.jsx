import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import ls from 'local-storage'

function HelpModal(props) {
  const handleClose = () => {
    props.setShow(false)
  }

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset your progress?')) {
      ls.clear()

      let emptyProgressObject = {
        museum: { percentage: 0, weight: 10, collected: [] },
        goldenTools: { count: 0, tools: [], weight: 10 },
        friendship: { friends: [], percentage: 0, weight: 10 },
        flowers: { grown: [], weight: 10 },
        diys: { percentage: 0, crafted: [], weight: 15 },
        cooking: { percentage: 0, recipesCooked: [], weight: 15 },
        gyroids: { collected: [], weight: 10 },
        nookMiles: { percentage: 0, goals: [], weight: 15 },
        crown: { worn: false, weight: 5 },
      }
      ls.set('progress', emptyProgressObject)
      props.setProgress(emptyProgressObject)
      window.location.reload()
    }
  }

  return (
    <div>
      <Modal
        dialogClassName='help-modal'
        show={props.show}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to the ACNH Perfection Tracker!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='info'>
            This site can be used to track your progress towards achieving
            Animal Crossing perfection! This idea and the list of goals was
            inspired by Stardew Valley, and is meant to challenge you to
            complete just about everything the game has to offer. Read below to
            learn more about these goals and start striving for perfection!{' '}
          </p>
          <p>
            To use the site, click on a goal to view it's details. From there,
            click on each item to mark it as complete (and click again to mark
            as incomplete). On the friendship page, enter the name of your
            villagers once you get their photo using the search bar at the top
            of the page. Also, the site is optimized for desktop view!
          </p>
          <div className='goals'>
            <ul>
              <li>
                <h3>Complete the Museum</h3>
                <p>
                  Find every fish, bug, sea creature, fossil, and art piece and
                  donate it to Blathers
                </p>
              </li>
              <li>
                <h3>Obtain all golden tools</h3>
                <p>
                  Craft the golden version of the Slingshot, Shovel, Watering
                  Can, and Axe
                </p>
              </li>
              <li>
                <h3>Collect every type of Gyroid</h3>
                <p>Dig up each of the 36 gyroids</p>
              </li>
              <li>
                <h3>Grow every flower</h3>
                <p>Grow every color of every flower</p>
              </li>
              <li>
                <h3>Collect and craft every seasonal DIY</h3>
                <p>Obtain the recipe for every seasonal DIY and craft it</p>
              </li>
              <li>
                <h3>Collect and cook every recipe</h3>
                <p>Grow every color of every flower</p>
              </li>
              <li>
                <h3>Complete all Nook Miles goals</h3>
                <p>Complete every level of each Nook Miles Achievement </p>
              </li>
              <li>
                <h3>Collect 34 Villager Photos</h3>
                <p>
                  Reach the highest level of friendship with 34* villagers and
                  recieve their photo as a gift. NPCs excluded.
                </p>
                <p>
                  *The number of townspeople you can befriend in Stardew Valley
                </p>
              </li>

              <li>
                <h3>Wear the Royal Crown</h3>
                <p>
                  Find the Royal Crown hat at the Able Sisters shop and buy it.
                </p>
              </li>
            </ul>
          </div>
          <div className='about-the-site'>
            <h3>About the Site</h3>
            <p>
              If you're enjoying the site and would like to support me, you can{' '}
              <a
                target='_blank'
                rel='noreferrer'
                href='https://www.buymeacoffee.com/lmphillips'>
                buy me a coffee!
              </a>
            </p>
            <p>
              If you have any issues, feedback, or ideas about the site, please
              shoot me an email at admin&#64;acnhperfection.com. Just a heads
              up, this is just a personal project I made for fun, so I may not
              be able to implement all changes but I'd love to hear your
              thoughts :&#41;
            </p>

            <p>
              The code for this project can be found on{' '}
              <a
                target='_blank'
                rel='noreferrer'
                href='https://github.com/lmphillips8/acnh-perfection'>
                my Github
              </a>
              . Special thanks to the creators the the{' '}
              <a
                target='_blank'
                rel='noreferrer'
                href='https://api.nookipedia.com/'>
                Nookipedia API
              </a>{' '}
              and the{' '}
              <a
                target='_blank'
                rel='noreferrer'
                href='https://docs.google.com/spreadsheets/d/13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4'>
                ACNH Community Spreadsheet{' '}
              </a>
              for helping provide data for this project!
            </p>
            <p>
              This site tracks all of your data locally in your browser. If you
              clear your cache or switch to a new browser, you will not see your
              original save data. If you'd like to COMPLETELY reset your save
              data, click the 'Reset' button below
            </p>
            <button className='reset-button' onClick={resetProgress}>
              Reset
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='got-it' onClick={handleClose}>
            Got it!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default HelpModal
