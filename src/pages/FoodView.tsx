import { useState, useEffect, useCallback } from 'react';
import {
  IonPage,
  IonToolbar,
  IonHeader,
  IonContent,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonImg,
  IonSkeletonText,
  IonIcon,
  IonChip,
  IonItem,
  IonLabel,
  IonList,
  IonButton
} from '@ionic/react';
import { heart, heartOutline, restaurantOutline } from 'ionicons/icons';
import {
  useFindId,
  FoodItem
} from '../hook/useApi';
import {
  addNew,
  getAll
} from '../hook/useStorag';
import { useParams } from 'react-router-dom';
import './FoodView.css';
import placeHolde from '../assets/comfort_food_placeholder.png';

function FoodView() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const food = useCallback(async () => {
    try {
      if (!id) return;
      const [, item] = await useFindId(id);
      const fetchedData = item?.[0];
      setData(fetchedData || null);

      if (fetchedData) {
        const allItem: FoodItem[] = getAll() || [];
        const exists = allItem.some((value) => value.id === fetchedData.id);
        setIsSaved(exists);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    food();
    // eslint-disable-next-line react-hooks/set-state-in-effect
  }, [food]);

  const saveItem = (s: FoodItem | null): void => {
    if (!s) return;
    const allItem: FoodItem[] = getAll() || [];
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
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" color="light" />
          </IonButtons>
          <IonTitle className="title">Recipe Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="food-view-background">
        {/* Image Section */}
        <div className="food-image-container">
          {loading ? (
            <IonSkeletonText animated className="skeleton-img" />
          ) : (
            <IonImg
              src={data?.image || placeHolde}
              alt={data?.name || "Recipe Image"}
              className="food-main-img"
            />
          )}
        </div>

        {/* Content Section */}
        <div className="food-view-content">
          <div className="food-header-section">
            <div className="title-and-category">
              {loading ? (
                <>
                  <IonSkeletonText animated style={{ width: '200px', height: '20px', borderRadius: '4px', marginBottom: '8px' }} />
                  <IonSkeletonText animated style={{ width: '70%', height: '32px', borderRadius: '4px' }} />
                </>
              ) : (
                <>
                  {data?.category && (
                    <IonChip className="category-chip">
                      <IonIcon icon={restaurantOutline} />
                      <IonLabel>{data.category}</IonLabel>
                    </IonChip>
                  )}
                  <h2>{data?.name || "Your Recipe"}</h2>
                </>
              )}
            </div>

            {!loading && (
              <div className="save-icon-btn">
                <IonButton
                  fill="clear"
                  className="save-btn"
                  aria-label="Favorite"
                  shape="round"
                  onClick={() => {
                    saveItem(data);
                  }}>
                  <IonIcon icon={isSaved ? heart : heartOutline} aria-hidden="true"
                    style={{
                      color: '#000',
                    }}/>
                </IonButton>
              </div>
            )}
          </div>

          {/* Ingredients Section */}
          <div className="section-box">
            <h3>Ingredients</h3>
            {loading ? (
              <div className="skeleton-list">
                <IonSkeletonText animated style={{ width: '100%', height: '18px', marginBottom: '10px' }} />
                <IonSkeletonText animated style={{ width: '85%', height: '18px', marginBottom: '10px' }} />
                <IonSkeletonText animated style={{ width: '90%', height: '18px' }} />
              </div>
            ) : (
              <IonList lines="none" className="ingredients-list">
                {data?.ingredients?.map((ingredient, index) => (
                  <IonItem key={index} className="ingredient-item">
                    <span className="bullet-point">•</span>
                    <IonLabel className="ion-text-wrap">{ingredient}</IonLabel>
                  </IonItem>
                ))}
              </IonList>
            )}
          </div>

          {/* Instructions Section */}
          <div className="section-box">
            <h3>Instructions</h3>
            {loading ? (
              <div className="skeleton-list">
                <IonSkeletonText animated style={{ width: '100%', height: '16px', marginBottom: '8px' }} />
                <IonSkeletonText animated style={{ width: '100%', height: '16px', marginBottom: '8px' }} />
                <IonSkeletonText animated style={{ width: '60%', height: '16px' }} />
              </div>
            ) : (
              <p className="instructions-text">
                {data?.instructions || "No instructions available for this recipe."}
              </p>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default FoodView;
