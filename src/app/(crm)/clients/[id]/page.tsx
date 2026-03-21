import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getClientById } from '@/features/clients/api/actions'
import ClientFormContainer from '@/features/clients/components/forms/ClientFormContainer'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Клиент' }

type Props = {
  params: Promise<{
    id: string
  }>
}
const Page = async (props: Props) => {
  return (
    <>
      <section>
        <div className='space-y-5'>
          <h3>Клиент</h3>
          <Tabs defaultValue='account' className='space-y-5'>
            <TabsList className='grid grid-cols-4 w-[500px]'>
              <TabsTrigger value='account'>Профиль</TabsTrigger>
              <TabsTrigger value='password'>Заказы</TabsTrigger>
              <TabsTrigger value='password2'>Автомобили</TabsTrigger>
              <TabsTrigger value='password3'>Настройки</TabsTrigger>
            </TabsList>
            <TabsContent value='account'>
              <Card className='w-96'>
                <CardHeader>
                  <CardTitle>Профиль</CardTitle>
                  <CardDescription>Редактирование данных клиента</CardDescription>
                </CardHeader>
                <CardContent className='space-y-2 '>
                  <ClientFormContainer />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='password'>
              <Card>
                <CardHeader>
                  <CardTitle>Заказы</CardTitle>
                  <CardDescription>Заказы клиента</CardDescription>
                </CardHeader>
                <CardContent className='space-y-2'></CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value='password2'>
              <Card className='w-96'>
                <CardHeader>
                  <CardTitle>Автомобили</CardTitle>
                  <CardDescription>Автомобили клиента</CardDescription>
                </CardHeader>
                <CardContent className='space-y-2 '>
                  <ClientFormContainer />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}
export default Page
