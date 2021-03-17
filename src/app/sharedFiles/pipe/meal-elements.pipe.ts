import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mealElements'
})
export class MealElementsPipe implements PipeTransform {

  transform(value:any,type:string):any{
    switch(type){
      case 'calories':{
          return value.recipe.calories * value.userServings;
      }
      case 'carbs':{
          return value.recipe.carbs * value.userServings;
      }
      case 'protein':{
          return value.recipe.protein * value.userServings;
      }
      case 'fat':{
          return value.recipe.fat * value.userServings;
      }
      case 'keywords':{
        if(value.recipe.diets !== null){
          return value.recipe.diets.concat(value.recipe.dishTypes);
        }else{
          return value.recipe.dishTypes;
        }
        
      }
      case 'ingredients':{
        return value.recipe.extendedIngredients;
      }
      case 'directions':{
        return value.recipe.analyzedInstructions;
      }
      case 'servings':{
        return value.recipe.servings;
      }
      case 'directions-steps':{
        return value[0].step;
      }
      case 'image':{
        return value.recipe.image;
      }
      case 'share':{
        return value.recipe.image;
      }
      case 'title':{
        return value.recipe.title;
      }
      case 'favorite':{
        return value.recipe.isFavorite;
      }
      case 'description':{
        return value.recipe.description;
      }
    }
  }

}
