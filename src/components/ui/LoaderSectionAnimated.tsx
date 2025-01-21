 import { LoaderIcon } from 'lucide-react';

const LoaderSectionAnimated = ({ className='bg-muted p-10', text = 'Загрузка..', ...props }) => {
  return (
    <div className={`flex items-center justify-center gap-1 text-muted-foreground ${className}`}>
      <LoaderIcon size={16} className={'animate-spin'} {...props} />
      {text && <span className={'text-sm'}>{text}</span>}
    </div>
  );
};

export default LoaderSectionAnimated;