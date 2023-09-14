import { City } from "./city"

export interface Enterprise {
    id?: number,
    rfc: string,
    razon_social: string,
    colonia: string
    idEstado: number
    idCiudad: number
    codigo_postal: string
    persona_fisica: boolean
    persona_moral: boolean
    idUsuario: number
    city: City
}
