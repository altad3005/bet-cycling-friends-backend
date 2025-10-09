import vine from '@vinejs/vine'

export const createLeagueValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(50),
    description: vine.string().maxLength(500).optional(),
    isPublic: vine.boolean().optional(),
    settings: vine
      .object({
        maxMembers: vine.number().min(2).max(100).optional(),
        allowBonuses: vine.boolean().optional(),
        pointsMultiplier: vine.number().min(1).max(5).optional(),
      })
      .optional(),
  })
)

export const joinLeagueValidator = vine.compile(
  vine.object({
    leagueId: vine.number().min(1),
    inviteCode: vine.string().minLength(2).maxLength(20),
  })
)

export const paramsValidator = vine.compile(
  vine.object({
    leagueId: vine.number().positive(),
    userId: vine.number().positive(),
  })
)
