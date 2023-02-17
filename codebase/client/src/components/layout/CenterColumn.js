import React from 'react'

const CenterColumn = (props) => {
  return (
    <div className={`columns is-centered ${props.className}`}>
      <div className='form column is-half'>
        {props.children}
      </div>
    </div>
  )
}

export default CenterColumn
