import { Squadra } from "./squadra.interface";

export interface Campionato {
    id?: number;
    nome: string;
    logo: string;
    squadre: Squadra[];
}
