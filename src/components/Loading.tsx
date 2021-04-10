import { faSpinner, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Loading: React.FC = () => {
  return (
    <div className="flex w-full h-full text-center align-middle items-center justify-center">
      <FontAwesomeIcon
        className=" animate-spin w-1/12"
        icon={faCircleNotch}
      ></FontAwesomeIcon>
    </div>
  );
};

export default Loading;
