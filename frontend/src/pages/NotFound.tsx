import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost } from '@fortawesome/free-solid-svg-icons'
import './NotFound.css';

export default function NotFound () {
  return (
    <div className="center full-height">
      <FontAwesomeIcon className="huge-icon" icon={faGhost} />
      <h2 className="center-text">
        Beside the ghost there is nothing here.
        <br></br>
        Click anywhere to return home.
      </h2>
    </div>
  )
}