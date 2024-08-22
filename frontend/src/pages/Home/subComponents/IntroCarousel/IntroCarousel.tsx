//* 3rd party packages
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

//* styles
import styles from "./IntroCarousel.module.css";

type Responsive = {};

function IntroCarousel() {
  const responsive: any = {
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
