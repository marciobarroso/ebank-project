import { useCallback, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { ReminderDialog } from '@/app/components/notes/reminder-dialog'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'

import { useAppContext } from '@/app/contexts/AppContext'

import { Note } from '@/app/types/note.types'

const noteSchema = z.object({
  content: z.string().min(1, 'Note content is required')
})

type NoteFormValues = z.infer<typeof noteSchema>

interface NotesTabProps {
  contactId: string
}

const formatDate = (dateString: string | Date | undefined) => {
  if (!dateString) return ''

  try {
    const date = new Date(dateString)
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return ''
    }
    return format(date, 'PP HH:mm')
  } catch (error) {
    throw error
  }
}

const sortNotes = (notes: Note[]) => {
  return [...notes].sort((a, b) => {
    const hasActiveReminderA =
      a.reminder?.dueDate && a.reminder.status !== 'completed'
    const hasActiveReminderB =
      b.reminder?.dueDate && b.reminder.status !== 'completed'

    // First, compare active reminder dates
    if (hasActiveReminderA && hasActiveReminderB) {
      return (
        new Date(a.reminder!.dueDate).getTime() -
        new Date(b.reminder!.dueDate).getTime()
      )
    }
    // Put notes with active reminders first
    if (hasActiveReminderA) return -1
    if (hasActiveReminderB) return 1

    // For notes without active reminders, sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

export function NotesTab({ contactId }: NotesTabProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const { isLoading, setIsLoading } = useAppContext()

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      content: ''
    }
  })

  const fetchNotes = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/contacts/${contactId}/notes`)
      const data = await response.json()
      setNotes(sortNotes(data))
    } catch (error) {
      toast.error('Failed to load notes')
    } finally {
      setIsLoading(false)
    }
  }, [contactId, setIsLoading])

  const onSubmit = async (values: NoteFormValues) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      if (!response.ok) {
        throw new Error('Failed to create note')
      }

      form.reset()
      await fetchNotes()
      toast.success('Note created successfully')
    } catch (error) {
      toast.error('Failed to create note')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetReminder = async (noteId: string, dueDate: Date) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/notes/${noteId}/reminder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dueDate })
      })

      if (!response.ok) {
        throw new Error('Failed to set reminder')
      }

      await fetchNotes() // Refresh notes to get updated reminder
      toast.success('Reminder set successfully')
    } catch (error) {
      toast.error('Failed to set reminder')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCompleteReminder = async (reminderId: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/reminders/${reminderId}/completed`, {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('Failed to complete reminder')
      }

      await fetchNotes() // Refresh notes
      toast.success('Reminder marked as completed')
    } catch (error) {
      toast.error('Failed to complete reminder')
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch notes on component mount
  useEffect(() => {
    // Create an async function inside useEffect
    const loadNotes = async () => {
      await fetchNotes()
    }

    loadNotes()
  }, [fetchNotes])

  return (
    <div className='space-y-6 pt-4'>
      {/* New Note Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex gap-4'>
          <Input
            placeholder='Add a note...'
            {...form.register('content')}
            disabled={isLoading}
            className='flex-1'
          />
          <Button type='submit' disabled={isLoading}>
            Add Note
          </Button>
        </div>
        {form.formState.errors.content && (
          <p className='text-sm text-red-500'>
            {form.formState.errors.content.message}
          </p>
        )}
      </form>

      {/* Notes List */}
      <div className='space-y-4'>
        {notes.length === 0 ? (
          <p className='text-center text-gray-500'>No notes yet</p>
        ) : (
          notes.map(note => (
            <Card key={note.id}>
              <CardContent className='p-4'>
                <div className='flex flex-col gap-4'>
                  {/* Top row: Note content spanning full width */}
                  <div className='col-span-2'>
                    <p className='text-justify text-gray-700'>{note.content}</p>
                  </div>

                  {/* Bottom row: Date on left, Reminder button on right */}
                  <div className='flex items-center justify-between'>
                    <p className='text-xs text-gray-500'>
                      {formatDate(note.createdAt)}
                    </p>
                    <ReminderDialog
                      note={note}
                      onSetReminder={handleSetReminder}
                      onCompleteReminder={handleCompleteReminder}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
