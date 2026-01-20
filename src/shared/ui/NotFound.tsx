import wrongrouteimg from "../../assets/not_found.gif";
const NotFound = () => {
  return (
    <div className="max-h-screen  mt-12 flex items-center justify-center px-4">
      <img
        src={wrongrouteimg}
        alt="Page not found"
        className="w-full h-[80vh] object-contain"
      />
    </div>
  );
};

export default NotFound;
