import type { HttpContext } from '@adonisjs/core/http'
import { UserService } from '#services/user_service'
import { inject } from '@adonisjs/core'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async leagues({ auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const leagues = await this.userService.getUserLeagues(user.id)
    return response.ok(leagues)
  }
}
