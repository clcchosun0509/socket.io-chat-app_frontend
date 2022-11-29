import Background from "./Background";
import Card from "./Card";
import Spinner from "./Spinner";

const FullScreenSpinner = () => {
  return (
    <Background>
      <Card className="flex flex-col justify-between divide-y-2">
        <Spinner />
      </Card>
    </Background>
  );
};

export default FullScreenSpinner;
