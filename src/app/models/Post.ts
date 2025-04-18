import { Tema } from "./Tema";
import { Usuario } from "./Usuario";

export interface Post {
    id: number;
    titulo: string;
    texto: string;
    usuario: Usuario;
    tema: Tema;
    data: string;
  }
  