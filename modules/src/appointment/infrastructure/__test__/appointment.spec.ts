import { describe, it, expect, vi, type Mock } from 'vitest'
import { getCurrentAppointment, getWeeklySlots, bookSlot } from '../appointment'
import api from '@/modules/http/infrastructure'
import type { BookAppointment } from '../../domain/appointment'
import '@/polyfill/objects'

vi.mock('@/modules/http/infrastructure', async () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn()
    }
  }
})

describe('Appointment Service', () => {
  describe('getCurrentAppointment', () => {
    it('should return a current appointment', async () => {
      const appointment = await getCurrentAppointment()
      expect(appointment).toEqual({
        doctorId: '1',
        doctorName: 'Dr Simeon Molas',
        date: expect.any(Date)
      })
    })
  })

  describe('getWeeklySlots', () => {
    it('should return weekly slots for the given date', async () => {
      const mockSlots = [
        { Start: new Date('2023-09-25T10:00:00Z'), End: new Date('2023-09-25T11:00:00Z') },
        { Start: new Date('2023-09-26T10:00:00Z'), End: new Date('2023-09-26T11:00:00Z') },
      ]

      ;(api.get as Mock).mockResolvedValue(mockSlots)

      const dateInput = new Date('2023-09-27')
      const result = await getWeeklySlots(dateInput)

      expect(result).toHaveProperty('2023-09-25')
      expect(result['2023-09-25']).toHaveLength(1)
      expect(result['2023-09-25'][0]).toHaveProperty('start')
      expect(result['2023-09-25'][0]).toHaveProperty('end')
    })
  });

  describe('bookSlot', () => {
    it('should call API to book a slot with correct data', async () => {
      const form: BookAppointment = {
        start: new Date('2023-09-25T10:00:00Z'),
        end: new Date('2023-09-25T11:00:00Z'),
        comments: 'Looking forward to it',
        patient: {
          name: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '123456789',
        },
      }

      ;(api.post as Mock).mockResolvedValue({})

      await bookSlot(form)

      expect(api.post).toHaveBeenCalledWith('availability/BookSlot', {
        Start: form.start,
        End: form.end,
        Comments: form.comments,
        Patient: {
          Name: form.patient.name,
          SecondName: form.patient.lastName,
          Email: form.patient.email,
          Phone: form.patient.phone,
        },
      })
    })
  })
})
