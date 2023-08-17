import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type ApplicationDocument = HydratedDocument<Application>;

@Schema()
export class Application {
  @Prop()
  title: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
