import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home }  from "./components/Home";
import Meals from "./components/Meals";
import AddMeal from "./components/AddMeal";
import SearchRecipe from "./components/SearchRecipe";
import RecipeInfo from "./components/RecipeInfo"
import DailyView from "./components/DailyView";
import Saved from "./components/SavedRecipes";
import Register from "./components/SignIn";


const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
    },
    {
    path: '/Meals',
    element: <Meals />
    },
    {path: '/AddMeal',
    element: <AddMeal />
    },
    {
      path: '/SearchRecipe',
      element: <SearchRecipe/>
    },
    {
      path: '/RecipeInfo',
      element: <RecipeInfo/>
    },
    {
      path: '/DailyView',
      element: <DailyView />
    },
      {
        path: '/SavedRecipes',
        element: <Saved />
    },
    {
        path: '/SignIn',
        element: <Register />
    }

];

export default AppRoutes;
