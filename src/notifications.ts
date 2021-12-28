import { INotification } from 'src/interfaces/notification.interface';

export const getMessage = (notification: INotification): INotification => {
  const { data, title, to, body, sound } = notification;

  return {
    to,
    sound: sound || 'default',
    title,
    body,
    data,
  };
};
