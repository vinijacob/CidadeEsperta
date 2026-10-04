interface BaseExercise {
  id: string;
  question: string;
  explanation: string;
}

export interface ChoiceExercise extends BaseExercise {
  type?: "choice";
  options: string[];
  correctAnswer: number;
}

/** O aluno monta o código tocando nas linhas na ordem correta. */
export interface OrderExercise extends BaseExercise {
  type: "order";
  solution: string[];
}

export type Exercise = ChoiceExercise | OrderExercise;

/** Resposta do aluno: índice (múltipla escolha) ou linhas na ordem (ordenar). */
export type Answer = number | string[] | null;
