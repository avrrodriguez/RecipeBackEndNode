export const QUERY =  {
  SELECT_USER_NAME: "SELECT * FROM users WHERE name = ?", 
  SELECT_USER: "SELECT * FROM users WHERE id = ?",
  CREATE_USER: "INSERT INTO users (name, password) VALUES (?, ?)"
}