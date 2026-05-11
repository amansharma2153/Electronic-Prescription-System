import Notification from './notification.model.js';

export const createNotification = async (userId, message, type) => {
  await Notification.create({ userId, message, type });
};