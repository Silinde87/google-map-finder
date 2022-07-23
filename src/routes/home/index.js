import AutoComplete from '../../components/molecules/AutoComplete';
import Map from '../../components/atoms/Map';
import { useReactContext } from '../../context/Context';

function Home() {
  const { setContext, context } = useReactContext();

  const onSelected = (center) => {
    setContext((prevContext) => ({
      ...prevContext,
      center,
      markers: [{ position: center }],
    }));
  };

  return (
    <>
      <AutoComplete onSelected={onSelected} />
      <Map center={context.center} markers={context.markers} />
    </>
  );
}

export default Home;
