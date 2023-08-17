import {CreateApplicationDto} from "./create.dto";
import {IsOptional} from "class-validator";

export class UpdateApplicationDto {
  @IsOptional()
  name?: string;
}
