import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonAvatar,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonButton,
  IonIcon
} from '@ionic/react';
import { Browser } from '@capacitor/browser';
import { logoGithub, logoWhatsapp, chatbubblesOutline } from 'ionicons/icons';
import './About.css';

function About() {
  const openLink = async (url: string) => {
    try {
      await Browser.open({ url });
    } catch (error) {
      console.log('Error opening browser:', error);
      window.open(url, '_blank');
    }
  };

  return (
    <div className="about">
      <IonCard className="about-card">
        <IonCardHeader className="about-head">
          <IonAvatar className="about-avatar">
            <img alt="app icon" src="/favicon.png" />
          </IonAvatar>
          <IonCardTitle className="about-title">Food Say</IonCardTitle>
          <IonText className="about-subtitle">Version 1.0.0</IonText>
        </IonCardHeader>

        <IonCardContent className="about-content">
          <p className="about-description">
            I built this app purely as a hobby. If you are interested, you are welcome to join and help further develop this app! Check out the repo: 
            <span 
              className="repo-link" 
              onClick={() => openLink('https://github.com/Ruwantha-OFFICIAL/food-say')}
            >
              food-say
            </span>
          </p>

          <div className="developer-section">
            <IonText className="dev-label">Developed by Ruwantha OFFICIAL</IonText>
            
            <div className="social-buttons">
              <IonButton 
                fill="solid" 
                className="social-btn github-btn" 
                onClick={() => openLink('https://github.com/Ruwantha-OFFICIAL')}
              >
                <IonIcon slot="start" icon={logoGithub} />
                GitHub
              </IonButton>

              <IonButton 
                fill="solid" 
                className="social-btn whatsapp-btn" 
                onClick={() => openLink('https://whatsapp.com/channel/0029VaxogApBKfi81YbOFz1U')}
              >
                <IonIcon slot="start" icon={logoWhatsapp} />
                Channel
              </IonButton>
            </div>

            <IonButton 
              fill="outline" 
              className="social-btn chat-btn" 
              onClick={() => openLink('https://wa.me/94788231166')}
            >
              <IonIcon slot="start" icon={chatbubblesOutline} />
              Contact on WhatsApp
            </IonButton>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
}

export default About;
