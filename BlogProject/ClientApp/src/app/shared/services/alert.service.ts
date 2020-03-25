import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

export type AlertType = 'success' | 'warning' | 'danger' | 'info';

export interface Alert {
  type: string;
  text: string;
}

@Injectable()
export class AlertService {
  public alert$ = new Subject<Alert>();

  success(text: string) {
    this.alert$.next({ type: 'success', text: text });
  }

  warning(text: string) {
    this.alert$.next({ type: 'warning', text: text });
  }

  danger(text: string) {
    this.alert$.next({ type: 'danger', text: text });
  }

  info(text: string) {
    this.alert$.next({ type: 'info', text: text });
  }
}
