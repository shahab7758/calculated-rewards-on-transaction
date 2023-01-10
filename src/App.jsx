import { createRoot } from "react-dom/client";
import Rewards from "./rewards";

const App = () => {
  return <Rewards />;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
