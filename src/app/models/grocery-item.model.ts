export interface GroceryItem {
  id: number;
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