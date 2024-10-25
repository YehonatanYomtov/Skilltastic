//* 3rd-party-packages
import { Oval } from "react-loader-spinner";

//* Styles
import styles from "./LoadingSpinner.module.css";

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
  color = "#2d9dff",
  secondaryColor = "#2d9dff",
  strokeWidth = 2,
  strokeWidthSecondary = 2,
}: LoadingSpinnerProps) {
  return (
    <div style={style} className={styles.loading_spinner_container}>
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
