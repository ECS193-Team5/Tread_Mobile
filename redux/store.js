import { createStore} from "redux";
import badgeC_reducer from "./reducers/badgeC_reducer.js";
const store = createStore(
  badgeC_reducer
);
export {store};