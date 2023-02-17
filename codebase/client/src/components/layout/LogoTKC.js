import React from 'react'

const LogoTKC = ({ className }) => {
  // Most of these CSS classes fine-tune how the logo looks and aren't important to understand
  return (
    <div className={`is-flex is-flex-direction-column is-align-content-center is-gapless ${className}`}>
      <div className="is-flex is-flex-direction-row is-justify-content-center pr-5">
        <img src="../../assets/img/tkp-pot.svg" alt="" className="image is-96x96" />
        <h1 className='title acumin mt-auto logo-text-teen'>Teen</h1>
      </div>
      <div className="title acumin mb-0 has-text-centered logo-text-kitchen">Kitchen</div>
      <div className="title acumin has-text-centered logo-text-companion">Companion</div>
    </div>
  )
}

export default LogoTKC
