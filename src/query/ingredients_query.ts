export const QUERY = {
  SELECT_INGREDIENTS: "SELECT * FROM ingredients",
  SELECT_INGREDIENT: "SELECT * FROM ingredients where id = ?",
  CREATE_INGREDIENT: "INSERT INTO ingredients (name, time_to_expiration_in_days, acquired_date, expiration_date) VALUES (?, ?, ?, ?)",
  UPDATE_INGREDIENT: "UPDATE ingredients SET name = ?, time_to_expiration_in_days = ?, acquired_date = ?, expiration_date = ?",
  DELETE_INGREDIENT: "DELETE FROM ingredients WHERE id = ?"
}