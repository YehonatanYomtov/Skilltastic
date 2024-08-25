//* 3rd party packages
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

//* Styles
import styles from "./IntroCarousel.module.css";

//* Types
type BreakpointType = {
  max: number;
  min: number;
};

type ResponsiveType = {
  [key: string]: {
    breakpoint: BreakpointType;
    items: number;
  };
};

function IntroCarousel() {
  const responsive: ResponsiveType = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      swipeable={true}
      draggable={true}
      autoPlay={true}
      infinite={true}
      arrows={true}
      autoPlaySpeed={7000}
      customTransition={"transform 800ms ease-in-out"}
      containerClass={styles.container}
      itemClass={styles.item}
    >
      <div className={styles.item} style={{ backgroundColor: "red" }}>
        Item 1
      </div>
      <div className={styles.item} style={{ backgroundColor: "green" }}>
        Item 2
      </div>
      <div className={styles.item} style={{ backgroundColor: "blue" }}>
        Item 3
      </div>
    </Carousel>
  );
}

export default IntroCarousel;
