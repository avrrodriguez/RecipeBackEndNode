export const QUERY =  {
  SELECT_USERS: "SELECT * FROM users LIMIT 50",
  SELECT_USER: "SELECT * FROM users WHERE id = ?",
  CREATE_USER: "INSERT INTO users (name, password) VALUES (?, ?)"
}