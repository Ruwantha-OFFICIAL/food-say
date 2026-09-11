import { IonSpinner } from '@ionic/react';
import './Loading.css';

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-bar-wrapper">
        <IonSpinner name="bubbles"/>
      </div>
    </div>
  );
}

export default Loading;
