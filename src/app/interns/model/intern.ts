export class Intern {
    private idIntern: number;
    private name: string;
    private country: string;
    private photo: string;
    private flagImage: string;
    private description: string;
    private rol: string;

    constructor(idIntern: number, name: string, country: string, photo: string, flagImage: string,
    description: string, rol: string) {
        this.idIntern = idIntern;
        this.name = name;
        this.country = country;
        this.photo = photo;
        this.flagImage = flagImage;
        this.description = description;
        this.rol = rol;
    }


    public getIdIntern(): number {
        return this.idIntern;
    }

    public setIdIntern(idIntern: number) {
        this.idIntern = idIntern;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getCountry(): string {
        return this.country;
    }

    public setCountry(country: string) {
        this.country = country;
    }

    public getPhoto(): string {
        return this.photo;
    }

    public setPhoto(photo: string) {
        this.photo = photo;
    }

    public getFlagImage(): string {
        return this.flagImage;
    }

    public setFlagImage(flagImage: string) {
        this.flagImage = flagImage;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string) {
        this.description = description;
    }

    public getRol(): string {
        return this.rol;
    }

    public setRol(rol: string) {
        this.rol = rol;
    }

}
