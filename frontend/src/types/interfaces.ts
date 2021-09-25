export interface IResponseSignUp {
  ok: boolean;
  name: string;
  uid: string;
  token: string;
  msg?: string;
}

export interface IResponseGETBook {
  ok: boolean;
  books: IBook[];
  msg?: string;
}

export interface IBook {
  _id: string;
  title: string;
  author: string;
  year: number;
  status: string;
  createdAt: string;
  updateAt: string;
}

export interface IAddBook {
  title: string;
  author: string;
  cover?: string;
  year: number;
  status: "completed" | "to be read" | "reading";
}
