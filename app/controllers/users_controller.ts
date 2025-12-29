import type { HttpContext } from '@adonisjs/core/http'
import { UserService } from '#services/user_service'
import { inject } from '@adonisjs/core'
import { updateUserValidator } from '#validators/user'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async leagues({ auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const leagues = await this.userService.getUserLeagues(user.id)
    return response.ok({ message: 'User leagues retrieved successfully', data: leagues })
  }

  async update({auth,request,response} : HttpContext) {
    const {avatarUrl ,notificationPreferences} = await request.validateUsing(updateUserValidator)
    const user = await auth.authenticate()
    this.userService.updateUser(user, avatarUrl, notificationPreferences)
    return response.ok({ message: 'User updated successfully', data: user })
  }

  async get({auth, response} : HttpContext) {
    const user = await auth.authenticate()
    const leagues = await this.userService.getUserLeagues(user.id)
    return response.ok({ message: 'Got user successfully', data: user , leagues: leagues})
  }

  async delete({auth, response} : HttpContext) {
    const user = await auth.authenticate()
    //const leagues = await this.userService.getUserLeagues(user.id)
    return response.ok({ message: 'User deleted successfully', data: user })
  }
}
