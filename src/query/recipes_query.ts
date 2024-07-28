export const QUERY =  {
  SELECT_RECIPES: "SELECT * FROM recipes ORDER BY created_at DESC LIMIT 50",
  SELECT_RECIPE: "SELECT * FROM recipes WHERE id = ?",
  CREATE_RECIPE: "INSERT INTO recipes (name, cooking_time, steps) VALUES (?, ?, ?)",
  UPDATE_RECIPE: "UPDATE recipes SET name = ?, cooking_time = ?, steps = ?",
  DELETE_RECIPE: "DELETE FROM recipes WHERE id = ?"
}