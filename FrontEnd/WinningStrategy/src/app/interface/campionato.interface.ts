import { Squadra } from "./squadra.interface";

export interface Campionato {
    nome: string;
    logo: string;
    squadre: Squadra[];
}
