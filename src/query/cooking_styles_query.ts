export const QUERY = {
  SELECT_COOKING_STYLES: "SELECT * FROM cookingstyles",
  SELECT_COOKING_STYLE: "SELECT * FROM cookingstyles where id = ?",
  CREATE_COOKING_STYLE: "INSERT INTO cookingstyles (name, description, users_id) VALUES (?, ?, ?)",
  UPDATE_COOKING_STYLE: "UPDATE cookingstyles SET name = ?, description = ?, users_id = ?",
  DELETE_COOKING_STYLE: "DELETE FROM cookingstyles WHERE id = ?"
}