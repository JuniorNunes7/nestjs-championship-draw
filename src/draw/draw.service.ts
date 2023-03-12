import { Injectable } from '@nestjs/common';
import { DoRandomDrawDTO } from './dto/do-random-draw.dto';
import { _ } from 'lodash';

@Injectable()
export class DrawService {
  async doRandomDraw(data: DoRandomDrawDTO) {
    const teams = _.shuffle(data.teams);
    const rounds = [...Array.from({ length: teams.length - 1 }, () => [])];

    for (const i in rounds) {
      const round = rounds[i];

      teams.forEach((home: string) => {
        this.handleRound(round, rounds, teams, home);
      });
    }

    return rounds;
  }

  withoutTeam(teams: Array<string>, team: string): Array<string> {
    return teams.filter((t: string) => t !== team);
  }

  handleRound(
    round: Array<{ home: string; visitor: string }>,
    rounds: Array<Array<{ home: string; visitor: string }>>,
    teams: Array<string>,
    home: string,
  ) {
    this.withoutTeam(teams, home).forEach((visitor) => {
      const teamsNotInRound: boolean = this.teamsNotInRound(
        round,
        home,
        visitor,
      );
      const teamsNotInAnotherRound: boolean = this.teamsNotInAnotherRound(
        rounds,
        home,
        visitor,
      );

      if (teamsNotInRound && teamsNotInAnotherRound) {
        round.push({
          home,
          visitor,
        });
      }
    });
  }

  teamsNotInRound(
    round: Array<{ home: string; visitor: string }>,
    home: string,
    visitor: string,
  ): boolean {
    if (!round) {
      return true;
    }

    return !round.some(
      (t) =>
        [home, visitor].includes(t.home) || [home, visitor].includes(t.visitor),
    );
  }

  teamsNotInAnotherRound(
    rounds: Array<Array<{ home: string; visitor: string }>>,
    home: string,
    visitor: string,
  ): boolean {
    let teamsNotInAnotherRound = true;
    rounds.forEach((round) => {
      if (!round) {
        return;
      }
      const teamsConfrontAlreadyExists: boolean = round.some((confront) => {
        return (
          (confront.home === home && confront.visitor === visitor) ||
          (confront.home === visitor && confront.visitor === home)
        );
      });

      if (teamsConfrontAlreadyExists) {
        teamsNotInAnotherRound = false;
        return;
      }
    });

    return teamsNotInAnotherRound;
  }
}
