export const saveTokenLocal = (token: string) => {
  localStorage.setItem("token", token);
  // keep track initial date of the token created
  localStorage.setItem("token-init-date", new Date().getTime().toString());
};
