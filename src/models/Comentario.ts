export class Comentario {
    id : number;
    titulo : string;
    mensaje? : string;
    idUser? : number;
    idComic? : number;

    constructor(
        id? : number,
        titulo? : string,
        mensaje? : string,
        idUser? : number,
        idComic? : number
    ) {
        this.id = id || null;
        this.titulo = titulo || '';
        this.mensaje = mensaje || '';
        this.idUser = idUser || null;
        this.idComic = idComic || null;
    }
}