export class Comic {
    id : number;
    nombre : string;
    isbn? : string;
    anotacionPrivada? : string;
    foto? : string;

    constructor(
        id? : number,
        nombre? : string,
        isbn? : string,
        anotacionPrivada? : string,
        foto? : string
    ) {
        this.id = id || null;
        this.nombre = nombre || '';
        this.isbn = isbn || '';
        this.anotacionPrivada = anotacionPrivada || '';
        this.foto = foto || null;
    }
}