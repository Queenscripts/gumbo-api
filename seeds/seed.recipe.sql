-- insert some suppliers
TRUNCATE TABLE recipes;
INSERT INTO recipes
  (thumbnail, title, ingredients, recipeurl)
VALUES
  ('https://bigoven-res.cloudinary.com/image/upload/w_300,c_fill,h_250/omelet-2250003.jpg', 'Roasted Pepper and Bacon Omelet', 'eggs, salt, black pepper, butter, black pepper, bacon, onions, garlic, roasted red peppers, oregano, black pepper', 'http://www.bigoven.com/43919-Roasted-Pepper-and-Bacon-Omelet-recipe.html'),
  ('https://bigoven-res.cloudinary.com/image/upload/w_300,c_fill,h_250/omelet-2250003.jpg', 'Eggplant Omelet with Coriander and Caraway', 'caraway seed, coriander, eggplant, eggs, garlic, lemon, olive oil, onions, black pepper, salt', 'http://www.epicurious.com/recipes/food/views/Eggplant-Omelet-with-Coriander-and-Caraway-306'),
  ('http://img.recipepuppy.com/694321.jpg', 'Blue Ribbon Meatloaf', 'onions', 'http://www.eatingwell.com/recipes/meatloaf.html'),
  ('http://img.recipepuppy.com/107122.jpg', 'Pulled Chicken Sandwiches (Crock Pot)', 'chicken, onions', 'http://www.recipezaar.com/Pulled-Chicken-Sandwiches-Crock-Pot-242547'),
  ('http://img.recipepuppy.com/12711.jpg', 'Slow Cooker Chile Verde', 'garlic, olive oil, onions, pork chops', 'http://allrecipes.com/Recipe/Slow-Cooker-Chile-Verde/Detail.aspx'),
  ('http://img.recipepuppy.com/17438.jpg', 'Best Black Beans', 'cayenne, garlic, onions, salt', 'http://allrecipes.com/Recipe/Best-Black-Beans/Detail.aspx'), ('http://img.recipepuppy.com/26549.jpg', 'Chicken Puffs', 'butter, chicken, garlic, onions', 'http://allrecipes.com/Recipe/Chicken-Puffs/Detail.aspx')
  ;

COMMIT;