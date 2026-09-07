import { LocalNotifications } from '@capacitor/local-notifications';

export const LocalNotification = async () => {
  try {
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display !== 'granted') {
      return;
    }
    await LocalNotifications.cancel({ notifications: [{ id: 100 }] });

    // 2h affter notification
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Food Say 🍲",
          body: "Do you still remember our new recipes? Go to the app and try cooking a new dish!",
          id: 100,
          schedule: { at: new Date(Date.now() + 3 * 60 * 60 * 1000)},
          sound: undefined,
        }
      ]
    });

    console.log("2-hour notification scheduled successfully!");
  } catch (error) {
    console.log("Error scheduling notification:", error);
  }
};
