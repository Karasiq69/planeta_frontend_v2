import Image from 'next/image'
import React from 'react'

const Logo = ({ width = 300, height = 50, className = '' }) => {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src='/logoblack_nodesc.svg'
        alt='logo'
        fill
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  )
}

export default Logo
