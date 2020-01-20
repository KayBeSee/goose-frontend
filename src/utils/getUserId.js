export const getUserId = (jwtToken) => {
  const decoded = jwt.verify(jwtToken, "23oijdsm23809sdf") // KBC-TODO: make this an env variable
  return decoded.userId;
}