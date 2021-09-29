import { IUserCreationDto } from './IUserCreationDto';

export interface IUserUpdateDto extends IUserCreationDto {
  updatedAt: Date;
}
