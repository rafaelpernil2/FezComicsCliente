export class Serie {
    id?: number;
    nombre?: string;
    genero?: string;
    anotacionPrivada?: string;

    constructor(
        id?: number,
        nombre?: string,
        genero?: string,
        anotacionPrivada?: string
    ) {
        this.id = id || null;
        this.nombre = nombre || '';
        this.genero = genero || '';
        this.anotacionPrivada = anotacionPrivada || '';
    }
}
