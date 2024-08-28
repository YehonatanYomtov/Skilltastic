// import CarouselDisplay from "../../../pages/Home/subComponents/IntroCarousel/IntroCarousel";

//* 3rd party components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

//* Course-feature component
import CourseCard from "../CourseCard/CourseCard";

//* Sub-components
import CustomLeftArrow from "./CustomLeftAndRightArrows/CustomLeftArrow";
import CustomRightArrow from "./CustomLeftAndRightArrows/CustomRightArrow";

//* Styles
import styles from "./CourseListDisplay.module.css";

//* Types
import { CourseCard as CourseCardType } from "../../../types/index.ts";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 3000, min: 1650 },
    items: 6,
  },
  desktopMd: {
    breakpoint: { max: 1650, min: 1400 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1400, min: 1150 },
    items: 4,
  },
  desktopSm: {
    breakpoint: { max: 1150, min: 900 },
    items: 3,
  },
  XS: {
    breakpoint: { max: 900, min: 650 },
    items: 2,
  },
  XXS: {
    breakpoint: { max: 650, min: 0 },
    items: 1,
  },
};

type CourseListDisplayProps = {
  courseList: CourseCardType[];
};

function CourseListDisplay({ courseList }: CourseListDisplayProps) {
  return (
    <Carousel
      responsive={responsive}
      swipeable={true}
      draggable={true}
      arrows={true}
      containerClass={styles.container}
      itemClass={styles.carouselItem}
      autoPlay={false}
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
    >
      {courseList.map((course) => (
        <CourseCard course={course} key={course.id} />
      ))}
    </Carousel>
  );
}

export default CourseListDisplay;
