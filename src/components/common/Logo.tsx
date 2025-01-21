import React from 'react';
import Image from 'next/image';

const Logo = ({ width = 300, height = 50, className = '' }) => {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src="/logoblack_nodesc.svg"
        alt="logo"
        fill
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  );
};

export default Logo;