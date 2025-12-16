export type DictionaryItem = {
  productId: string,
  label: string,
}

export type DictionaryResponseBody = {
  id: string,
  dictionary_items: DictionaryItem[]
}