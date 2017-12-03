export class Company {
    private idCompany: number;
    private name: string;
    private phone: string;
    private email: string;

    constructor(idCompany: number, name: string, phone: string, email: string) {
        this.idCompany = idCompany,
        this.name = name;
        this.phone = phone;
        this.email = email;
    }

    public getIdCompany(): number {
        return this.idCompany;
    }

    public setIdCompany(idCompany: number) {
        this.idCompany = idCompany;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getPhone(): string {
        return this.phone;
    }

    public setPhone(phone: string) {
        this.phone = phone;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string) {
        this.email = email;
    }
}
