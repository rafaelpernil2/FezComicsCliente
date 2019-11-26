export class Like {
    id: number;
    user?: number;
    comic?: number;

    constructor(
        id?: number,
        user?: number,
        comic?: number
    ) {
        this.id = id || null;
        this.user = user || null;
        this.comic = comic || null;
    }
}
