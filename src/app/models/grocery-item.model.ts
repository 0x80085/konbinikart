export interface GroceryItem {
  id: string;
  emoji: string;
  nameEnglish: string;
  nameKatakana: string;
  nameHiragana: string;
  nameRomaji: string;
}

export interface EditableGroceryItem extends GroceryItem {
  isInStorage: boolean;
  dateLastInteraction: Date;
}