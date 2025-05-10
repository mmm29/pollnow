import { ApiClient } from "./api";
import { createApplication } from "./app";
import { renderUi } from "./ui/main";

export const apiClient = new ApiClient("http://localhost:8114");

renderUi(createApplication(apiClient));
