import {IsOptional} from "class-validator";

export class UpdateDeviceDto {
  @IsOptional()
  name?: string;
}
