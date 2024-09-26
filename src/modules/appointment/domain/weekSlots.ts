export interface SlotTime {
  start: Date
  end: Date
}

export type WeekSlots = Record<string, SlotTime[]>