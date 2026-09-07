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
import { useState, useEffect } from 'react';

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
} from '../utility/notification'

import Seachscreen from '../components/Seachscreen';
import Loading from '../components/Loading';
import Error from '../components/Error';
import About from './About';
import './Home.css';

// 1. Error Enum
export enum AppError {
  NETWORK_ERROR = "Network connection failed. Please check your internet connection.",
  NOT_FOUND = "Results is not found",
  NOT_SAVE = "Not favorite food saved",
  NONE = ""
}

function Home() {
  /*
  * Data,Save is page Mani
  * Data has chenge seach & page Loading
  * Save Has chenge addSave & page Loading
  */
  const [ Data, setData ] = useState<FoodItem[]>([]);
  const [ SearchVal, setSearchVal ] = useState('');
  const [ Save, setSave ] = useState<FoodItem[]>([]);
  const [ activeTab, setActiveTab ] = useState<string>('seach');
  const [ IsLoading, setIsLoading ] = useState(false);
  const [ currentError, setCurrentError ] = useState<AppError>(AppError.NONE);

  const refreshData = () => {
    setSave(getAll());
  };

  useEffect(() => {
    findPop();
    refreshData();
    LocalNotification();
  }, []);

  let findPop = async () => {
    //chek internet conctions
    if (!navigator.onLine) {
      setCurrentError(AppError.NETWORK_ERROR);
      setData([]);
      return;
    }

    try {
      setIsLoading(true);
      setCurrentError(AppError.NONE);

      let [ success, items ] = await usePopuler();

      if (!success || items.length === 0) {
        setCurrentError(AppError.NOT_FOUND);
        setData([]);
      } else {
        setData(items);
      }
      refreshData();
    } catch (error: any) {
      console.error("Field :", error.message);
      setCurrentError(AppError.NETWORK_ERROR);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };
  //Search handeler debounce 1.6s
  let handleSearch = debounce(async (val: string) => {
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

      let [ success, items ] = await useSearch(val);

      if (!success || items.length === 0) {
        setCurrentError(AppError.NOT_FOUND);
        setData([]);
      } else {
        setData(items);
      }
      refreshData();
    } catch (error) {
      setCurrentError(AppError.NETWORK_ERROR);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, 1600);

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
