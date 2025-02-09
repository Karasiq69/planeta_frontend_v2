 import { LoaderIcon } from 'lucide-react';
 import {cn} from "@/lib/utils";

const LoaderSectionAnimated = ({ className='bg-muted ', text = 'Загрузка..', ...props }) => {
  return (
    <div className={cn('flex items-center justify-center gap-1 p-10 text-muted-foreground rounded-sm',className)}>
      <LoaderIcon size={16} className={'animate-spin'} {...props} />
      {text && <span className={'text-sm'}>{text}</span>}
    </div>
  );
};

export default LoaderSectionAnimated;