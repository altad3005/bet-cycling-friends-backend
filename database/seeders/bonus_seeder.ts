import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Bonus from '#models/bonus'

export default class extends BaseSeeder {
  async run() {
    await Bonus.createMany([
      {
        name: 'Pneu crevé',
        description: 'Bloque le choix d’un coureur adverse.',
        bonusType: 'pre_race',
        effectDescription: 'block_rider',
        seasonLimit: 3,
      },
      {
        name: 'Coup de bordure',
        description: 'Double les points sur une course.',
        bonusType: 'pre_race',
        effectDescription: 'double_points',
        seasonLimit: 3,
      },
      {
        name: 'Double pari',
        description: 'Permet de choisir deux coureurs, mais points divisés par deux.',
        bonusType: 'pre_race',
        effectDescription: 'double_pick',
        seasonLimit: 3,
      },
      {
        name: 'Espion',
        description: 'Voir les pronostics d’un ami avant la course.',
        bonusType: 'pre_race',
        effectDescription: 'spy_friend',
        seasonLimit: 2,
      },
      {
        name: 'Swap',
        description: 'Échanger son pari avec un autre joueur dans une fenêtre limitée.',
        bonusType: 'in_race',
        effectDescription: 'swap_prediction',
        seasonLimit: 3,
      },
      {
        name: 'Série gagnante',
        description: '+50 points après 3 bons pronos consécutifs.',
        bonusType: 'post_race',
        effectDescription: 'winning_streak',
      },
      {
        name: 'Audace récompensée',
        description: 'Bonus si ton coureur est unique et termine sur le podium.',
        bonusType: 'post_race',
        effectDescription: 'unique_podium',
      },
      {
        name: 'Comeback',
        description: 'Petit boost après trois courses sans points.',
        bonusType: 'post_race',
        effectDescription: 'comeback',
      },
      {
        name: 'Capitaine (GT)',
        description: 'Coureur désigné voit ses points doublés.',
        bonusType: 'grand_tour',
        effectDescription: 'captain',
        raceLimit: 1,
      },
      {
        name: 'Remplaçant (GT)',
        description: 'Remplacement possible d’un coureur après abandon.',
        bonusType: 'grand_tour',
        effectDescription: 'substitute',
        raceLimit: 1,
      },
    ])
  }
}
