import './Notification.css';

const Notification = ({ notification, type }) => {
  return (
    <div className={`notification ${type}`}>
      {notification}
    </div>
  );
};

export default Notification;
