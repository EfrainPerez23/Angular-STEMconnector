export class ActivityPoint {
    private id: number;
    private Activity_idActivity: number;
    private description: string;



    constructor(id: number, Activity_idActivity: number, description: string) {
        this.id = id;
        this.Activity_idActivity = Activity_idActivity;
        this.description = description;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
    }

    public getActivity_idActivity(): number {
        return this.Activity_idActivity;
    }

    public setActivity_idActivity(Activity_idActivity: number) {
        this.Activity_idActivity = Activity_idActivity;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string) {
        this.description = description;
    }
}
