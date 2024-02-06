import CommentModel from "./CommentModel";
import IngredientModel from "./IngredientModel.ts";

export default interface CakeModel {
    id: number;
    name: string;
    img: string;
    description: string;
    price: number;
    url: string;
    ingredients: IngredientModel[];
    comments: CommentModel[];
}
