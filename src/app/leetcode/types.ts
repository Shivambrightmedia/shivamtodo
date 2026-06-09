export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Recursion' | 'Backtracking' | 'Binary Trees';
  description: string;
  approach: string;
  complexity: string;
  example: string;
  diagram: string;
  code: string;
}