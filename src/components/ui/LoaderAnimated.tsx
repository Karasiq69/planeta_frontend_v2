import { LoaderIcon } from 'lucide-react'
import React from 'react'

const LoaderAnimated = ({ className = '', text = '', ...props }) => {
  return (
    <div className={`flex items-center justify-center gap-1 text-muted-foreground ${className}`}>
      <LoaderIcon size={16} className="animate-spin" {...props} />
      {text && <span className="text-sm">{text}</span>}
    </div>
  )
}

export default LoaderAnimated
