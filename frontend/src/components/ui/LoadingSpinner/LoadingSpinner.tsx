import { Oval } from "react-loader-spinner";

type LoadingSpinnerProps = {
  style?: React.CSSProperties;
  height?: number;
  width?: number;
  color?: string;
  secondaryColor?: string;
  strokeWidth?: number;
  strokeWidthSecondary?: number;
};

function LoadingSpinner({
  style,
  height = 80,
  width = 80,
  color = "#4fa94d",
  secondaryColor = "#4fa94d",
  strokeWidth = 2,
  strokeWidthSecondary = 2,
}: LoadingSpinnerProps) {
  return (
    <div style={style}>
      <Oval
        height={height}
        width={width}
        color={color}
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor={secondaryColor}
        strokeWidth={strokeWidth}
        strokeWidthSecondary={strokeWidthSecondary}
      />
    </div>
  );
}

export default LoadingSpinner;
