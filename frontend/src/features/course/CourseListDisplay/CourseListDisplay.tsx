// import CarouselDisplay from "../../../pages/Home/subComponents/IntroCarousel/IntroCarousel";

//* 3rd party components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

//* Course-feature component
import CourseCard from "../CourseCard/CourseCard";

//* Sub-components
import CustomLeftArrow from "./CustomLeftAndRightArrows/CustomLeftArrow";
import CustomRightArrow from "./CustomLeftAndRightArrows/CustomRightArrow";

//* Types
import { Course, CourseCard as CourseCardType } from "../../../types/index.ts";

//* Styles
import styles from "./CourseListDisplay.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../data/store.ts";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner.tsx";

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
  courseList: CourseCardType[] | Course[];
};

function CourseListDisplay({ courseList }: CourseListDisplayProps) {
  const status = useSelector<RootState>((state) => state.course.status);

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
      {courseList && status !== "loading" ? (
        courseList.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </Carousel>
  );
}

export default CourseListDisplay;
