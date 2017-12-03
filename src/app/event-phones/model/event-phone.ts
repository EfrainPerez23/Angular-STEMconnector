export class EventPhone {
    private idEventPhone: number;
    private phone: string;
    private Event_idEvent: number;


    constructor(idEventPhone: number, phone: string, Event_idEvent: number) {
        this.idEventPhone = idEventPhone;
        this.phone = phone;
        this.Event_idEvent = Event_idEvent;
    }


    public getIdEventPhone(): number {
        return this.idEventPhone;
    }

    public setIdEventPhone(idEventPhone: number) {
        this.idEventPhone = idEventPhone;
    }

    public getPhone(): string {
        return this.phone;
    }

    public setPhone(phone: string) {
        this.phone = phone;
    }

    public getEvent_idEvent(): number {
        return this.Event_idEvent;
    }

    public setEvent_idEvent(Event_idEvent: number) {
        this.Event_idEvent = Event_idEvent;
    }
}
