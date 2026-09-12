import React, { useState } from 'react';
import {
  IonCol,
  IonCard,
  IonImg,
  IonButton,
  IonIcon
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { heart, heartOutline } from 'ionicons/icons';

import './FoodCard.css';
import { FoodItem } from '../hook/useApi';
import {
  addNew,
  getAll
} from '../hook/useStorag';
import placeHolde from '../assets/comfort_food_placeholder.png'

interface Props {
  food: FoodItem;
  onUpdate: () => void;
}

const Foodcard: React.FC<Props> = ({ food, onUpdate }) => {
  const navigate = useNavigate();
  const allSaved = getAll();
  const [ isSaved, setIsSaved ] = useState<boolean>(
    allSaved.some((item) => item.id === food.id)
  );

  const saveItem = (s: FoodItem): void => {
    const allItem: FoodItem[] = getAll();
    const exists = allItem.some((value) => value.id === s.id);
    setIsSaved(!exists);

    if (exists) {
      const filtered = allItem.filter((v) => v.id !== s.id);
      localStorage.setItem("Saved", JSON.stringify(filtered));
      s.save = false;
    } else {
      s.save = true;
      addNew(s);
    }
    setTimeout(() => {
      onUpdate();
    }, 400);
  };

  return (
    <IonCol size="6" size-md="4" size-lg="3">
      <IonCard className="card">
        {/*background image*/}
        <div className="card-image-wrapper">
          <IonImg
            src={food.image || placeHolde}
            alt={food.name}
            className="card-img"
          />
        </div>
        {/*Content layear*/}
        <div className="content-layer">
          {/*up side*/}
          <div className="card-header-actions">
            <IonButton
              fill="clear"
              className="save-btn"
              aria-label="Favorite"
              shape="round"
              onClick={() => {
                saveItem(food);
              }}>
              <IonIcon icon={isSaved ? heart : heartOutline} aria-hidden="true" />
            </IonButton>
          </div>
          {/*Down side*/}
          <div 
            className="card-footer-info"
            onClick={(e) => {
              e.preventDefault();
              setTimeout(() => {
                navigate('/food/' + food.id);
              }, 600)
            }}>
            <h3>{food.name}</h3>
            <p>{food.category}</p>
          </div>
        </div>
      </IonCard>
    </IonCol>
  );
};

export default Foodcard;
