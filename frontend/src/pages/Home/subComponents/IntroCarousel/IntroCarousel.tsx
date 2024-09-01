//* 3rd party packages
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

//* Styles
import styles from "./IntroCarousel.module.css";
import IntroDisplayItem from "./IntroDisplayItem/IntroDisplayItem";

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
      <IntroDisplayItem style={{ backgroundImage: "url(images/bg-1.jpg)" }}>
        Welcome to SkillTastic! where Skills are taught and learned.
      </IntroDisplayItem>
      <IntroDisplayItem style={{ backgroundImage: "url(images/bg-2.jpg)" }}>
        Don't forget about your Wishlist :p
      </IntroDisplayItem>
      <IntroDisplayItem style={{ backgroundColor: "#dde3af" }}>
        Don't forget about your Wishlist :p
      </IntroDisplayItem>
    </Carousel>
  );
}

export default IntroCarousel;
