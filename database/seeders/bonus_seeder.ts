import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Bonus from '#models/bonus'

export default class extends BaseSeeder {
  async run() {
    await Bonus.createMany([
      {
        name: 'Pneu crevé',
        description: 'Bloque le choix d’un coureur adverse.',
        type: 'pre_race',
        effect: 'block_rider',
        seasonLimit: 3,
      },
      {
        name: 'Coup de bordure',
        description: 'Double les points sur une course.',
        type: 'pre_race',
        effect: 'double_points',
        seasonLimit: 3,
      },
      {
        name: 'Double pari',
        description: 'Permet de choisir deux coureurs, mais points divisés par deux.',
        type: 'pre_race',
        effect: 'double_pick',
        seasonLimit: 3,
      },
      {
        name: 'Espion',
        description: 'Voir les pronostics d’un ami avant la course.',
        type: 'pre_race',
        effect: 'spy_friend',
        seasonLimit: 2,
      },
      {
        name: 'Swap',
        description: 'Échanger son pari avec un autre joueur dans une fenêtre limitée.',
        type: 'in_race',
        effect: 'swap_prediction',
        seasonLimit: 3,
      },
      {
        name: 'Série gagnante',
        description: '+50 points après 3 bons pronos consécutifs.',
        type: 'post_race',
        effect: 'winning_streak',
      },
      {
        name: 'Audace récompensée',
        description: 'Bonus si ton coureur est unique et termine sur le podium.',
        type: 'post_race',
        effect: 'unique_podium',
      },
      {
        name: 'Comeback',
        description: 'Petit boost après trois courses sans points.',
        type: 'post_race',
        effect: 'comeback',
      },
      {
        name: 'Capitaine (GT)',
        description: 'Coureur désigné voit ses points doublés.',
        type: 'grand_tour',
        effect: 'captain',
        raceLimit: 1,
      },
      {
        name: 'Remplaçant (GT)',
        description: 'Remplacement possible d’un coureur après abandon.',
        type: 'grand_tour',
        effect: 'substitute',
        raceLimit: 1,
      },
    ])
  }
}
