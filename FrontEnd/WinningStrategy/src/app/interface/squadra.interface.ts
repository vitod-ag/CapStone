import { Calciatore } from "./calciatore.interface";

export interface Squadra {
    id?: number;
    nome: string;
    logo: string;
    calciatori: Calciatore[];
}
