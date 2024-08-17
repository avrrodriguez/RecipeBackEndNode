export const QUERY =  {
  SELECT_ALL_RECIPES: "SELECT * FROM recipes WHERE users_id = 0",
  SELECT_USER_RECIPES: "SELECT * FROM recipes WHERE name = ?",
  SELECT_RECIPE: "SELECT * FROM recipes WHERE id = ?",
  CREATE_RECIPE: "INSERT INTO recipes (name, cooking_time, steps) VALUES (?, ?, ?)",
  UPDATE_RECIPE: "UPDATE recipes SET name = ?, cooking_time = ?, steps = ?",
  DELETE_RECIPE: "DELETE FROM recipes WHERE id = ?"
}