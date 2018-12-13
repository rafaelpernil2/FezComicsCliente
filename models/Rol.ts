export class Rol{
    id?: number;
    nombre?: string;

    constructor(
        id? : number,
        nombre?: string
    ){
        this.id=id ||null;
        this.nombre= nombre || '';
    }
}