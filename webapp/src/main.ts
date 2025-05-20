import { renderUi } from "./ui/main";
// import { createDevApplication } from "./bootstrap/development";
import { createProdApplication } from "./bootstrap/production";

renderUi(createProdApplication());
