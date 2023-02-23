import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home }  from "./components/Home";
import Meals from "./components/Meals";
import AddMeal from "./components/AddMeal";
import SearchRecipe from "./components/SearchRecipe";


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
    }

];

export default AppRoutes;
