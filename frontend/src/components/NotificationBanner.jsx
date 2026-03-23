import { useState, useEffect } from 'react';

const NotificationBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [notificationData, setNotificationData] = useState(null);

  useEffect(() => {
    const hasSeenNotification = sessionStorage.getItem('casamanduva_notification_seen');

    if (!hasSeenNotification) {
      const timer = setTimeout(() => {
        setNotificationData({
          title: 'Welcome to CASAMANDUVA! 🏠',
          message: 'Get a FREE consultation + 10% off on your first project!',
        });
        setIsVisible(true);

        // Browser notification (if permission granted)
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Welcome to CASAMANDUVA!', {
            body: 'Get a FREE consultation + 10% off on your first project!',
            icon: '/logo.jpg',
            tag: 'welcome-notification',
          });
        }

        sessionStorage.setItem('casamanduva_notification_seen', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => setIsVisible(false);

  if (!notificationData) return null;

  return (
    <div className={`notification-banner ${isVisible ? 'show' : ''}`}>
      <span className="icon">🎉</span>
      <div className="content">
        <h4>{notificationData.title}</h4>
        <p>{notificationData.message}</p>
      </div>
      <button className="close-btn" onClick={handleClose} aria-label="Close notification">
        ×
      </button>
    </div>
  );
};

export default NotificationBanner;
