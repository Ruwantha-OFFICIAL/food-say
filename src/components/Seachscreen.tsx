import React from 'react';
import {
  IonGrid,
  IonRow,
} from '@ionic/react';

import { FoodItem } from '../hook/useApi';
import FoodCard from './FoodCard';

interface SearchScreenProps {
  items: FoodItem[];
  onUpdate: () => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ items, onUpdate }) => { 
  //* 2*2 list 
  return (
    <IonGrid>
      <IonRow>
        {items.map((item) => (
          <FoodCard food={item} key={item.id} onUpdate={onUpdate} />
        ))}
      </IonRow>
    </IonGrid>
  );
}

export default SearchScreen;
