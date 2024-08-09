export const QUERY =  {
  SELECT_USER_NAME: "SELECT * FROM users WHERE name = ?", 
  CREATE_USER: "INSERT INTO users (name, password) VALUES (?, ?)"
}