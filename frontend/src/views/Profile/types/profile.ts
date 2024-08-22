export interface ProfileDTO {
  userId: number
  month: number
  year: number
}

export const defaultProfileDTO: ProfileDTO = {
  userId: 0,
  month: 0,
  year: 0
}
