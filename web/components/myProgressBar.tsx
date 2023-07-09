import ProgressBar from "@ramonak/react-progress-bar";

interface Props {
  value: number; // between 0 and 1
  color: string;
}

function MyProgressBar(props: Props) {
  return (
    <ProgressBar
      height="50px"
      labelSize="18px"
      bgColor={props.color}
      completed={props.value * 100}
      customLabel={(props.value * 100).toFixed(2) + "%"}
      animateOnRender={true}
    />
  );
}

export default MyProgressBar
