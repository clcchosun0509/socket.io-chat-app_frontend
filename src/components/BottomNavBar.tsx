import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment as faSolidComment, faUser as faSolidUser } from "@fortawesome/free-solid-svg-icons";
import { faComment as faRegularComment, faUser as faRegularUser } from "@fortawesome/free-regular-svg-icons";

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  active: "chat" | "profile";
  onClickChat?: React.MouseEventHandler<SVGSVGElement>
  onClickProfile?: React.MouseEventHandler<SVGSVGElement>
};
const BottomNavBar = ({ active, onClickChat, onClickProfile, className, ...props }: Props) => {
  const iconClass = "w-1/2 py-4 cursor-pointer"
  return (
    <div className={`w-full h-20 flex justify-around items-center ${className}`} {...props}>
      {active === "chat" ? (
        <FontAwesomeIcon className={iconClass} icon={faSolidComment} size="2x" />
      ) : (
        <FontAwesomeIcon className={iconClass} icon={faRegularComment} size="2x" onClick={onClickChat} />
      )}
      {active === "profile" ? (
        <FontAwesomeIcon className={iconClass} icon={faSolidUser} size="2x" />
      ) : (
        <FontAwesomeIcon className={iconClass} icon={faRegularUser} size="2x" onClick={onClickProfile} />
      )}
    </div>
  );
};

export default BottomNavBar;
