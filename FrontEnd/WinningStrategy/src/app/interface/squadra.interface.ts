import { Calciatore } from "./calciatore.interface";

export interface Squadra {
    nome: string;
    logo: string;
    calciatori: Calciatore[];
}
