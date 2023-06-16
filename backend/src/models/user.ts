export type UserType = {
  id: string;
  email: string;
  password: string;
  name: string;
  companyName: string;
  tokens: [string];
};

export type RequestUser = {
  body: UserType;
  params: { id: string };
};
