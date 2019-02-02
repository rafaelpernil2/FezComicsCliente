import { Rol } from "./Rol";

export class User{
    id: number;
    nombre: string;
    rol: number;
    constructor(
        id?: number,
        nombre?: string,
        rol?: number
    ){
        this.id = id || null;
        this.nombre = nombre || '';
        this.rol = rol || null;
    }
}