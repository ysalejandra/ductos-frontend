import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Component,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

import { colors } from './colors';
import { PedidoService } from '../../@services/pedido.service';
import { Pedido } from '../../@models/pedido.model';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ActivatedRoute, Router } from '@angular/router';

interface Evento extends CalendarEvent {
  id: number;
}

registerLocaleData(localeEs);
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})


export class CalendarioComponent {
  
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  actions: CalendarEventAction[] = [
    
  ];

  refresh: Subject<any> = new Subject();

  events: Evento[] = []
  /*[
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];
  */
  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private pedidoService : PedidoService, private router: Router, private r: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.pedidoService.getPedidos().subscribe(res => {
      res.forEach(
        (pedido:Pedido) => this.events.push({
          start: startOfDay(new Date(pedido.fechaEntrega)),
      title: 'Pedido: ' + pedido.cliente.nombre + ' ' + pedido.cliente.apellidoPaterno + ' ' + pedido.cliente.apellidoMaterno + ', ' + pedido.codigoSeguimiento,
      color: colors.yellow,
      id: pedido.idPedido,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
        })
      )
      console.log(this.events);
      this.refresh.next();
    });
    
    
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
          id: 0
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    //this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
    console.log(this.r.parent);
    this.router.navigate(['../pedidos/ver/' + event.id], {relativeTo: this.r});
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        id: 0,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}

