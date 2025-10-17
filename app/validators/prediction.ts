import vine from '@vinejs/vine'

export const CreatePredictionValidator = vine.compile(
  vine.object({
    favoriteRider: vine.string(),
  })
)

export const UpdatePredictionValidator = vine.compile(
  vine.object({
    favoriteRider: vine.string(),
  })
)
