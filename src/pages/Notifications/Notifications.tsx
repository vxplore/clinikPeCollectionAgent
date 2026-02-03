import NotificationCard from "./components/NotificationCard";
const Notifications = () => {
  const mockNotification = [
    {
      title: "Take More Steps!",
      message: "Take 3150 more steps today.",
      time: "47m",
      progress: 0.72,
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      {mockNotification.map((notification, index) => (
        <NotificationCard key={index} notification={notification} />
      ))}
    </div>
  );
};

export default Notifications;
