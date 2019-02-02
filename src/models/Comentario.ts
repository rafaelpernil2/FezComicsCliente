export class Comentario {
    id : number;
    titulo : string;
    mensaje? : string;
    user? : number;
    comic? : number;

    constructor(
        id? : number,
        titulo? : string,
        mensaje? : string,
        user? : number,
        comic? : number
    ) {
        this.id = id || null;
        this.titulo = titulo || '';
        this.mensaje = mensaje || '';
        this.user = user || null;
        this.comic = comic || null;
    }
}