import { PartialType } from '@nestjs/mapped-types';
import { CreateNotifiactionDto } from './create-notifiaction.dto';

export class UpdateNotifiactionDto extends PartialType(CreateNotifiactionDto) {}
