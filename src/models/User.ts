import { Rol } from "./Rol";

export class User{
    id: number;
    nombre: string;
    rolId: Rol;
    constructor(
        id?: number,
        nombre?: string,
        rolId?: Rol
    ){
        this.id = id || null;
        this.nombre = nombre || '';
        this.rolId = rolId || null;
    }
}