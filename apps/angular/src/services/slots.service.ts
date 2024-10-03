import {
  getWeeklySlots,
  WeekSlots
} from "@book-appointment/modules"
import { CommonService } from './common.service';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SlotsService extends CommonService<WeekSlots>{
  getWeeklySlots(date: Date) {
    this.execute(getWeeklySlots, date)
  }
}
