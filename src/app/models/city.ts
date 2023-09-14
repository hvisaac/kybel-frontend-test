import { State } from "./state";

export interface City {
    id?: number,
    name: string,
    idEstado: number,
    estado: State
}
