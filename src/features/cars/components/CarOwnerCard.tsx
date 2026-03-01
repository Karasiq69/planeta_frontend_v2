import { ExternalLink, UserIcon } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatPhone } from '@/lib/utils'

import type { IClient } from '@/features/clients/types'

interface CarOwnerCardProps {
  owner: IClient
}

export default function CarOwnerCard({ owner }: CarOwnerCardProps) {
  const { firstName, lastName, phone, email, id } = owner

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex flex-row flex-wrap gap-4 items-center">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{`${firstName} ${lastName}`}</CardTitle>
            <CardDescription>{email}</CardDescription>
          </div>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/clients/${id}`}>
            <ExternalLink className="size-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="flex gap-3 justify-between items-center">
        <span className="text-sm">{formatPhone(phone)}</span>
      </CardContent>
    </Card>
  )
}
