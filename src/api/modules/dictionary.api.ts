import type { DictionaryResponseBody } from "../../types/dictionary.type";
import { api } from "../axios";

export const dictionaryApi = {
  buscar: () => api.get<DictionaryResponseBody>(`/dictionary/find`),
};
