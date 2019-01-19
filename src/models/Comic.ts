import { Comentario } from "./Comentario";
import { Like } from "./Like";

export class Comic {
    id : number;
    nombre : string;
    isbn? : string;
    anotacionPrivada? : string;
    foto? : string;
    comentarios? : Comentario[];
    likes? : Like[];

    constructor(
        id? : number,
        nombre? : string,
        isbn? : string,
        anotacionPrivada? : string,
        foto? :string,
        comentarios? : Comentario[],
        likes? : Like[]
    ) {
        this.id = id || null;
        this.nombre = nombre || '';
        this.isbn = isbn || '';
        this.anotacionPrivada = anotacionPrivada || '';
        this.foto = foto || null;
        this.comentarios = comentarios || [];
        this.likes = likes || [];
    }
}