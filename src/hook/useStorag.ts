import { FoodItem } from './useApi';

export function addNew(item: FoodItem): boolean {
  try {
    const existingData = localStorage.getItem("Saved");
    const items: FoodItem[] = existingData ? JSON.parse(existingData) : [];
    if (items.some((savedItem) => savedItem.id === item.id)) {
      return false; 
    }

    items.push(item);
    localStorage.setItem("Saved", JSON.stringify(items));
    return true;
  } catch (error) {
    console.error("Failed to save item to localStorage", error);
    return false;
  }
}

export function removeStored(id: string): void {
  try {
    const existingData = localStorage.getItem("Saved");
    if (!existingData) return;
    let items: FoodItem[] = JSON.parse(existingData);
    items = items.filter(v => v.id !== id);
    localStorage.setItem("Saved", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to remove item", error);
  }
}

export function getAll(): FoodItem[]{
  try {
    const existingData = localStorage.getItem("Saved");
    const items: FoodItem[] = existingData ? JSON.parse(existingData) : [];
    return items;
  } catch (error) {
    console.error("Failed get Items", error);
    return [];
  }
}
