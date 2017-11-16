export class EventModel {
    private status: boolean;
    private name: string;
    private description: string;
    private startDate: Date;
    private endDate: Date;
    private location: string;
    private email: string;
    private idEvent: number;


	// tslint:disable-next-line:indent
    constructor(idEvent: number, status: boolean, name: string, description: string,
         startDate: Date, endDate: Date, location: string, email: string) {
            this.idEvent = idEvent;
    		// tslint:disable-next-line:indent
    		this.status = status;
    		// tslint:disable-next-line:indent
    		this.name = name;
    		this.description = description;
    		// tslint:disable-next-line:indent
    		this.startDate = startDate;
    		// tslint:disable-next-line:indent
    		this.endDate = endDate;
    		this.location = location;
    		// tslint:disable-next-line:indent
    		this.email = email;
    }

    public getIdEvent(): number {
        return this.idEvent;
    }

    public setIdEvent(idEvent: number) {
        this.idEvent = idEvent;
    }

    public setStatus(status: boolean) {
        this.status = status;
    }

    public getStatus(): boolean {
        return this.status;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }
    public setDescription(description: string) {
        this.description = description;
    }

    public getDescription(): string {
        return this.description;
    }

    public setStartDate(startDate: Date) {
        this.startDate = startDate;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public setEndDate(endDate: Date) {
        this.startDate = endDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public getLocation(): string {
        return this.location;
    }

    public setLocation(location: string) {
        this.location = location;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public getEmail(): string {
        return this.email;
    }
}
