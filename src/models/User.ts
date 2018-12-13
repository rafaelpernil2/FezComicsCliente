import { Rol } from "./Rol";

export class User{
    id: number;
    nombre: string;
    rol: Rol;
    constructor(
        id?: number,
        nombre?: string,
        rol?: Rol
    ){
        this.id = id || null;
        this.nombre = nombre || '';
        this.rol = rol || null;

    }
}