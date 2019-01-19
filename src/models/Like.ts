export class Like {
    id : number;
    idUser? : number;
    idComic? : number;

    constructor(
        id? : number,
        idUser? : number,
        idComic? : number
    ) {
        this.id = id || null;
        this.idUser = idUser || null;
        this.idComic = idComic || null;
    }
}