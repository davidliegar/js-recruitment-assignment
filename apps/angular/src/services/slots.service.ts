import {
  getWeeklySlots,
  WeekSlots
} from "@book-appointment/modules"
import { CommonService } from './common.service';
import { Injectable } from "@angular/core";

interface WeekSlotsError {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class SlotsService extends CommonService<WeekSlots, WeekSlotsError>{
  getWeeklySlots(date: Date) {
    this.execute(getWeeklySlots, date)
  }
}
