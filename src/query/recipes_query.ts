export const QUERY =  {
  SELECT_PATIENTS: "SELECT * FROM recipes ORDER BY created_at DESC LIMIT 50",
  SELECT_PATIENT: "SELECT * FROM recipes WHERE id = ?",
  CREATE_PATIENTS: "INSERT INTO recipes (name, cooking_time, steps) VALUES (?, ?, ?)",
  UPDATE_PATIENTS: "UPDATE recipes SET name = ?, cooking_time = ?, steps = ?",
  DELETE_PATIENTS: "DELETE FROM recipes WHERE id = ?"
}