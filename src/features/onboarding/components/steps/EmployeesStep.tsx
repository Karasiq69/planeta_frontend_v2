'use client'

import { useState } from 'react'
import { Plus, Trash2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { mockEmployees } from '../../mock-data'
import { MockEmployee } from '../../types'

type Props = {
  defaultValues: MockEmployee[]
  onSave: (data: MockEmployee[]) => void
}

export function EmployeesStep({ defaultValues, onSave }: Props) {
  const [employees, setEmployees] = useState<MockEmployee[]>(
    defaultValues.length > 0 ? defaultValues : mockEmployees
  )

  const update = (next: MockEmployee[]) => {
    setEmployees(next)
    onSave(next)
  }

  const addEmployee = () => {
    update([
      ...employees,
      { id: crypto.randomUUID(), name: 'Новый сотрудник', role: 'Сотрудник', email: '' },
    ])
  }

  const removeEmployee = (id: string) => {
    update(employees.filter((e) => e.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <CardTitle>Сотрудники</CardTitle>
        </div>
        <CardDescription>Добавьте членов вашей команды</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="flex items-center justify-between py-3 px-2 -mx-2 rounded-md transition-colors hover:bg-muted/50"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">{employee.name}</span>
                <span className="text-sm text-muted-foreground">{employee.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge>{employee.role}</Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeEmployee(employee.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4 w-full" onClick={addEmployee}>
          <Plus className="mr-2 h-4 w-4" />
          Добавить сотрудника
        </Button>
      </CardContent>
    </Card>
  )
}
