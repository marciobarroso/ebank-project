'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/app/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/app/components/ui/select'

import { ProspectSchema } from '@/app/api/prospects/schema'

// Use Zod inference to get the type from the schema
type ProspectFormValues = z.infer<typeof ProspectSchema>

interface ProspectFormProps {
  onSubmit: (values: ProspectFormValues) => Promise<void>
  isLoading?: boolean
}

const originOptions = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'client_referral', label: 'Client Referral' },
  { value: 'internal_referral', label: 'Internal Referral' },
  { value: 'external_referral', label: 'External Referral' },
  { value: 'active_prospecting', label: 'Active Prospecting' },
  { value: 'passive_prospecting', label: 'Passive Prospecting' },
  { value: 'social_media', label: 'Social Media' },
  { value: 'event', label: 'Event' },
  { value: 'other', label: 'Other' }
]

const stageOptions = [
  { value: 'prospecting', label: 'Prospecting' },
  { value: 'qualification', label: 'Qualification' },
  { value: 'project', label: 'Project' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'contract', label: 'Contract' }
]

export function ProspectForm({ onSubmit, isLoading }: ProspectFormProps) {
  const form = useForm<ProspectFormValues>({
    resolver: zodResolver(ProspectSchema),
    defaultValues: {
      name: '',
      address: '',
      stage: 'prospecting',
      origin: 'marketing',
      responsible: '',
      contacts: []
    }
  })

  const handleSubmit = async (values: ProspectFormValues) => {
    try {
      await onSubmit(values)
      form.reset()
    } catch (error) {
      throw error
    }
  }

  return (
    <form
      id='prospect-form'
      onSubmit={form.handleSubmit(handleSubmit)}
      className='space-y-6'
    >
      <div className='space-y-2'>
        <label htmlFor='name' className='text-sm font-medium text-gray-700'>
          Name
        </label>
        <Input id='name' {...form.register('name')} disabled={isLoading} />
        {form.formState.errors.name && (
          <p className='text-sm text-red-500'>
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <label htmlFor='address' className='text-sm font-medium text-gray-700'>
          Address
        </label>
        <Input id='address' {...form.register('address')} disabled={isLoading} />
        {form.formState.errors.address && (
          <p className='text-sm text-red-500'>
            {form.formState.errors.address.message}
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <label htmlFor='stage' className='text-sm font-medium text-gray-700'>
          Stage
        </label>
        <Select
          onValueChange={value => form.setValue('stage', value as any)}
          defaultValue={form.getValues('stage')}
          disabled={isLoading}
        >
          <SelectTrigger id='stage'>
            <SelectValue placeholder='Select a stage' />
          </SelectTrigger>
          <SelectContent>
            {stageOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.stage && (
          <p className='text-sm text-red-500'>
            {form.formState.errors.stage.message}
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <label htmlFor='origin' className='text-sm font-medium text-gray-700'>
          Origin
        </label>
        <Select
          onValueChange={value => form.setValue('origin', value as any)}
          defaultValue={form.getValues('origin')}
          disabled={isLoading}
        >
          <SelectTrigger id='origin'>
            <SelectValue placeholder='Select an origin' />
          </SelectTrigger>
          <SelectContent>
            {originOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.origin && (
          <p className='text-sm text-red-500'>
            {form.formState.errors.origin.message}
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <label htmlFor='responsible' className='text-sm font-medium text-gray-700'>
          Responsible
        </label>
        <Input
          id='responsible'
          {...form.register('responsible')}
          disabled={isLoading}
        />
        {form.formState.errors.responsible && (
          <p className='text-sm text-red-500'>
            {form.formState.errors.responsible.message}
          </p>
        )}
      </div>
    </form>
  )
} 