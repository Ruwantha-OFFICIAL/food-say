const url: string = 'https://applicable-paulie-lasithruwantha124689-26a8a3d7.koyeb.app';
const token: string = '4yfxeiofdvcxz34io9plms';

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  instructions: string;
  ingredients: string[];
  image?: string;
  save?: boolean;
}

interface FoodsResponse {
  Staus: boolean;
  Error?: string;
  Data: FoodItem[];
}

export async function usePopuler(): Promise<[boolean, FoodItem[]]> {
  try {
    const data = await fetch(url + '/api/food', {
      headers: {
        'Content-Type': 'application/json',
        'Token': token,
      },
    });

    if (!data.ok) {
      return [false, []];
    }

    const result: FoodsResponse = await data.json();

    if (!result.Staus) {
      return [false, result.Data || []];
    }

    return [true, result.Data || []];
  } catch (error) {
    console.error('[debug] usePopuler error: ', error);
    return [false, []];
  }
}

export async function useSearch(searchTerm: string): Promise<[boolean, FoodItem[]]> {
  try {
    if (!searchTerm.trim()) {
      return [false, []];
    }

    const response = await fetch(url + `/api/foodfind?q=${encodeURIComponent(searchTerm)}`, {
      headers: {
        'Content-Type': 'application/json',
        'Token': token,
      },
    });

    if (!response.ok) {
      return [false, []];
    }

    const result: FoodsResponse = await response.json();
    const items = result.Data || (Array.isArray(result) ? result : []);

    return [true, items];
  } catch (error) {
    console.error('[debug] useSearch error: ', error);
    return [false, []];
  }
}

export async function useFindId(id: string): Promise<[boolean, FoodItem[]]> {
  try {
    if (!id.trim()) {
      return [false, []];
    }

    const data = await fetch(url + `/api/foodfind?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Token': token,
      },
    });

    if (!data.ok) {
      return [false, []];
    }

    const result: FoodsResponse = await data.json();
    const items = result.Data || (Array.isArray(result) ? result : []);

    return [true, items];
  } catch (error) {
    console.error('[debug] useFindId error: ', error);
    return [false, []];
  }
}
