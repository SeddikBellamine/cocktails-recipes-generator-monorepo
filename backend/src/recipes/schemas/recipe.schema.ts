import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: [String] })
  ingredients: string[];

  @Prop({ required: true })
  instructions: string;
}

const RecipeSchema = SchemaFactory.createForClass(Recipe);

RecipeSchema.pre('save', function (next) {
  this.ingredients = this.ingredients.map((ingredient) =>
    ingredient.toLowerCase()
  );
  next();
});

export { RecipeSchema };
