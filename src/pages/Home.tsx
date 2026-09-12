import {
  IonPage,
  IonHeader,
  IonContent,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSegmentView,
  IonSegmentContent,
  IonSearchbar
} from '@ionic/react';
import { debounce } from 'lodash';
import { useState, useEffect, useCallback } from 'react';

import {
  usePopuler,
  useSearch,
  FoodItem
} from '../hook/useApi';
import {
  getAll
} from '../hook/useStorag';
import {
  LocalNotification
} from '../utility/notification';
import { AppError } from '../types/errors';

import Seachscreen from '../components/Seachscreen';
import Loading from '../components/Loading';
import Error from '../components/Error';
import About from './About';
import './Home.css';

function Home() {
  const [Data, setData] = useState<FoodItem[]>([]);
  const [SearchVal, setSearchVal] = useState('');
  const [Save, setSave] = useState<FoodItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>('seach');
  const [IsLoading, setIsLoading] = useState(false);
  const [currentError, setCurrentError] = useState<AppError>(AppError.NONE);

  const refreshData = useCallback(() => {
    setSave(getAll());
  }, []);

  const findPop = useCallback(async () => {
    if (!navigator.onLine) {
      setCurrentError(AppError.NETWORK_ERROR);
      setData([]);
      return;
    }

    try {
      setIsLoading(true);
      setCurrentError(AppError.NONE);

      const [success, items] = await usePopuler();

      if (!success || items.length === 0) {
        setCurrentError(AppError.NOT_FOUND);
        setData([]);
      } else {
        setData(items);
      }
      refreshData();
    } catch (error) {
      console.error("Error:", error);
      setCurrentError(AppError.NETWORK_ERROR);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [refreshData]);

  useEffect(() => {
    findPop();
    LocalNotification();
    // eslint-disable-next-line react-hooks/set-state-in-effect
  }, [findPop]);

  // Search handler debounce 1.6s
  const handleSearch = useCallback(
    debounce(async (val: string) => {
      setSearchVal(val);
      if (!val.trim()) {
        findPop();
        return;
      }

      if (!navigator.onLine) {
        setCurrentError(AppError.NETWORK_ERROR);
        setData([]);
        return;
      }

      try {
        setIsLoading(true);
        setCurrentError(AppError.NONE);

        const [success, items] = await useSearch(val);

        if (!success || items.length === 0) {
          setCurrentError(AppError.NOT_FOUND);
          setData([]);
        } else {
          setData(items);
        }
        refreshData();
      } catch (error) {
        console.error("Error:", error);
        setCurrentError(AppError.NETWORK_ERROR);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }, 1600),
    [findPop, refreshData]
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="var(--primary-color)">
          <IonTitle className="title">
            Food Say
          </IonTitle>
        </IonToolbar>
        <div style={{
          padding: "0 8px",
        }}>
          <IonSearchbar
            placeholder="Search food"
            value={SearchVal}
            className="seach-box"
            onIonInput={(e) => handleSearch(e.detail.value!)}
          />
        </div>

        <IonSegment
          value={activeTab}
          onIonChange={(e) => {
            setActiveTab(String(e.detail.value!));
            refreshData();
          }}
        >
          <IonSegmentButton
            value="seach"
            contentId="seach">
            <IonLabel>Search</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            value="saved"
            contentId="saved">
            <IonLabel>Saved</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            value="about"
            contentId="about">
            <IonLabel>About</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonHeader>
      <IonContent>
        <IonSegmentView>
          <IonSegmentContent id="seach">
            {IsLoading ? (
              <Loading />
            ) : currentError !== AppError.NONE ? (
              <Error message={currentError} />
            ) : (
              <Seachscreen items={Data} onUpdate={refreshData} />
            )}
          </IonSegmentContent>
          <IonSegmentContent id="saved">
            {Save && Save.length > 0 ? (<Seachscreen items={Save} onUpdate={refreshData} />) : (<Error message={AppError.NOT_SAVE} />) }
          </IonSegmentContent>
          <IonSegmentContent id="about">
            <About />
          </IonSegmentContent>
        </IonSegmentView>
      </IonContent>
    </IonPage>
  );
}

export default Home;
