import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    avatarUrl: vine.string().optional(),
    notificationPreferences: vine.string().optional(),
  })
)
