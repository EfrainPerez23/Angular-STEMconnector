export class InitiativeModel {
    private idInitiative: number;
    private name: string;
    private description: string;
    private imageUrl: string;


	// tslint:disable-next-line:indent
	constructor(idInitiative: number, name: string, description: string, imageUrl: string) {
		this.idInitiative = idInitiative;
		// tslint:disable-next-line:indent
		this.name = name;
		this.description = description;
		// tslint:disable-next-line:indent
		this.imageUrl = imageUrl;
	// tslint:disable-next-line:indent
	}

    public setIdInitiative(idInitiative: number) {
        this.idInitiative = idInitiative;
    }


    public getIdInitiative(): number {
        return this.idInitiative;
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

    public setImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl;
    }

    public getImageUrl(): string {
        return this.imageUrl;
    }


}
