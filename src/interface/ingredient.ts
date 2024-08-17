export interface Ingredient {
  name: string,
  time_to_expiration_in_days: number,
  acquired_date: Date,
  expiration_date: Date
}