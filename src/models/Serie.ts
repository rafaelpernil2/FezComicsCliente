export class Serie {
    id?: number;
    nombre?: string;
    genero?: string;
    anotacion_privada?: string;

    constructor(
        id?: number,
        nombre?: string,
        genero?: string,
        anotacion_privada?: string
    ) {
        this.id = id || null;
        this.nombre = nombre || '';
        this.genero = genero || '';
        this.anotacion_privada = anotacion_privada || '';
    }
}
