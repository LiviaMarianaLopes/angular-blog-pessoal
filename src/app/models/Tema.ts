import { Post } from "./Post";

export interface Tema {
    id: number;
    titulo: string;
    descricao: string;
    postagens: Post[];
  }