import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .unique(async (query, field) => {
        const user = await query.from('users').where('email', field).first()
        return !user
      }),
    password: vine.string().minLength(12).maxLength(512),
    pseudo: vine
      .string()
      .minLength(3)
      .maxLength(30)
      .regex(/^[a-zA-Z0-9_]+$/)
      .unique(async (query, field) => {
        const user = await query.from('users').where('pseudo', field).first()
        return !user
      }),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(32),
  })
)
