import { Comentario } from "./Comentario";
import { Like } from "./Like";

export class Comic {
    id : number;
    nombre : string;
    isbn? : string;
    anotacion_privada? : string;
    foto? : string;
    //comentarios? : Comentario[];
    //likes? : Like[];

    constructor(
        id? : number,
        nombre? : string,
        isbn? : string,
        anotacion_privada? : string,
        foto? :string,
        //comentarios? : Comentario[],
        //likes? : Like[]
    ) {
        this.id = id || null;
        this.nombre = nombre || '';
        this.isbn = isbn || '';
        this.anotacion_privada = anotacion_privada || '';
        this.foto = foto || null;
        //this.comentarios = comentarios || [];
        //this.likes = likes || [];
    }
}