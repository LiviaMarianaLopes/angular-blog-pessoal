import { Post } from "./Post";
export interface Usuario {
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    postagens: Post[];
  }