export class Speaker {
    private idSpeaker: number;
    private name: string;
    private title: string;
    private bio: string;
    private imageUrl: string;


    constructor(idSpeaker: number, name: string, title: string, bio: string, imageUrl: string) {
        this.idSpeaker = idSpeaker;
        this.name = name;
        this.title = title;
        this.bio = bio;
        this.imageUrl = imageUrl;
    }

    public setIdSpeaker(idSpeaker: number) {
        this.idSpeaker = idSpeaker;
    }

    public getIdSpeaker(): number {
        return this.idSpeaker;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setTitle(title: string) {
        this.title = title;
    }

    public getTitle(): string {
        return this.title;
    }

    public setBio(bio: string) {
        this.bio = bio;
    }

    public getBio(): string {
        return this.bio;
    }

    public setImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl;
    }

    public getImageUrl(): string {
        return this.imageUrl;
    }

}
