import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Spinner = () => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <FontAwesomeIcon icon={faCircleNotch} spin={true} size="5x" />
    </div>
  );
};

export default Spinner;
