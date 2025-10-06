export interface ScraperRaceResult {
  /**
   * Récupère le top 10 des résultats d'une course, d'un stage ou du classement général (GC) d'une course par étapes.
   *
   * @param raceId - L'identifiant de la course tel qu'utilisé dans l'URL de ProCyclingStats (ex: 'tour-de-france/2025', 'giro-d-italia/2025').
   * @param isGc - (Optionnel) Si true, récupère le classement général (GC) pour les courses par étapes.
   *               Ignoré si un `stage` est spécifié.
   * @param stage - (Optionnel) L'identifiant du stage pour une course par étapes (ex: 'stage-21').
   *                Si fourni, la méthode retournera le top 10 de ce stage.
   *
   * @returns Promise<any> - Une promesse résolue avec un tableau contenant les 10 premiers résultats.
   *                         Chaque élément du tableau contient généralement les informations suivantes :
   *                         - `rank`: Position du coureur dans le top 10
   *                         - `name`: Nom du coureur
   *                         - `team`: Nom de l'équipe
   *                         - `country`: Code du pays (ISO ou classe CSS du drapeau)
   *                         - `uciPoints`: Points UCI attribués pour ce résultat
   *                         - `time`: Temps ou écart sur le leader (si disponible)
   */
  getTop10(raceId: string, isGc?: boolean, stage?: string): Promise<any>;
}
