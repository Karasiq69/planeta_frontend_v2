import { Badge } from '@/components/ui/badge'

type Props = {
  licence_plate?: string
}
const LicencePlateBadge = ({ licence_plate }: Props) => {
  return (
    <div className="flex font-mono text-nowrap text-center  w-28">
      {licence_plate ? (
        // TODO сделать покрасивее
        <Badge
          variant='outline'
          className='
                        font-mono
                        text-sm
                        py-1
                        px-2
                        bg-background
                        border-2
                        border-secondary
                        rounded-md
                        hover:border-secondary-foreground
                        transition-colors

      '
        >
          {licence_plate}
        </Badge>
      ) : (
        <span
          className="bg-white text-muted-foreground border-2 border-dashed border-gray-200 p-1 rounded text-center   w-full"
        >
          не указано
        </span>
      )}
    </div>
  )
}
export default LicencePlateBadge
