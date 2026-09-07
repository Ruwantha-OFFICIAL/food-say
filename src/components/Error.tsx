import React from 'react';
import { IonIcon } from '@ionic/react';
import {
  cloudOfflineOutline,
  searchOutline,
  alertCircleOutline,
  folderOpenOutline
} from 'ionicons/icons';
import './Error.css';

interface Props {
  message: string;
}

function Error({ message }: Props) {
  const getIcon = () => {
    if (message.toLowerCase().includes('network') || message.toLowerCase().includes('connection')) {
      return cloudOfflineOutline;
    } else if (message.toLowerCase().includes('not found') || message.toLowerCase().includes('results')) {
      return searchOutline;
    } else if (message.toLowerCase().includes('not favorite') || message.toLowerCase().includes("saved")) {
      return folderOpenOutline
    }
    return alertCircleOutline;
  };

  return (
    <div className="erro-view">
      <div className="erro-content">
        <IonIcon icon={getIcon()} className="erro-icon" />
        <h2>{message}</h2>
      </div>
    </div>
  );
}

export default Error;
