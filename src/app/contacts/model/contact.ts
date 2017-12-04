export class Contact {
    private idContact: number;
    private linkedIn: string;
    private facebook: string;
    private googleP: string;
    private website: string;
    private Company_idCompany: number;
    private twitter: string;

    constructor(idContact: number, linkedIn: string, facebook: string, googleP: string, website: string,
    Company_idCompany: number, twitter: string) {
        this.idContact = idContact;
        this.linkedIn = linkedIn;
        this.facebook = facebook;
        this.googleP = googleP;
        this.website = website;
        this.Company_idCompany = Company_idCompany;
        this.twitter = twitter;
    }



    public getIdContact(): number {
        return this.idContact;
    }

    public setIdContact(idContact: number) {
        this.idContact = idContact;
    }

    public getLinkedIn(): string {
        return this.linkedIn;
    }

    public setLinkedIn(linkedIn: string) {
        this.linkedIn = linkedIn;
    }

    public getFacebook(): string {
        return this.facebook;
    }

    public setFacebook(facebook: string) {
        return this.facebook = facebook;
    }

    public getGoogleP(): string {
        return this.googleP;
    }

    public setGoogleP(googleP: string) {
        this.googleP = googleP;
    }

    public getWebsite(): string {
        return this.website;
    }

    public setWebsite(website: string) {
        this.website = website;
    }

    public getCompany_idCompany(): number {
        return this.Company_idCompany;
    }

    public setCompany_idCompany(Company_idCompany: number) {
        this.Company_idCompany = Company_idCompany;
    }

    public getTwitter(): string {
        return this.twitter;
    }

    public setTwitter(twitter: string) {
        this.twitter = twitter;
    }
}
