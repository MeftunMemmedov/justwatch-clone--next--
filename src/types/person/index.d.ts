export type Person = {
  id: string;
  fullName: string;
  bio?: string;
  type?: string[];
};

export type Actor = {
  actor: Person;
  character: string;
};
