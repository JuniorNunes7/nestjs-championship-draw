import { IsArray } from 'class-validator';

export class DoRandomDrawDTO {
  @IsArray()
  teams: Array<string>;
}
