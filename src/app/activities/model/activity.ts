export class Activity {
    private idActivity: number;
    private Event_idEvent: number;
    private startTime: Date;
    private endTime: Date;
    private name: string;
    private description: string;
    private location: string;

    constructor(idActivity: number, Event_idEvent: number, startTime: Date, endTime: Date,
                name: string, description: string, location: string ) {
        this.idActivity = idActivity;
        this.Event_idEvent = Event_idEvent;
        this.startTime = startTime;
        this.endTime = endTime;
        this.name = name;
        this.description = description;
        this.location = location;
    }

    public getIdActivity(): number {
        return this.idActivity;
    }

    public setIdActivity(idActivity: number) {
        this.idActivity = idActivity;
    }

    public getEvent_idEvent(): number {
        return this.Event_idEvent;
    }

    public setEvent_idEvent(Event_idEvent: number) {
        this.Event_idEvent = Event_idEvent;
    }

    public getStartTime(): Date {
        return this.startTime;
    }

    public setStartTime(startTime: Date) {
        this.startTime = startTime;
    }

    public getEndTime(): Date {
        return this.endTime;
    }

    public setEndTime(endTime: Date) {
        this.endTime = endTime;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string) {
        this.description = description;
    }


    public getLocation(): string {
        return this.location;
    }

    public setLocation(location: string) {
        this.location = location;
    }
}
