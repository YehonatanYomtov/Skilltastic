//* components-UI
import ShowCase from "../../components/ui/ShowCase/ShowCase";
import CourseListDisplay from "../../features/course/CourseListDisplay/CourseListDisplay";
import IntroCarousel from "./subComponents/IntroCarousel/IntroCarousel";

//* styles
import styles from "./Home.module.css";
import WelcomeMessage from "../../features/user/WelcomeMessage/WelcomeMessage";
import SearchCoursesInput from "./subComponents/SearchCoursesInput/SearchCoursesInput";

const courseList = [
  {
    id: 1,
    category: "Web development",
    subcategory: "JavaScript",
    courseTitle: "JavaScript Essentials",
    teacherName: "John Doe",
    courseDescription:
      "A comprehensive course on JavaScript, covering basic to advanced topics.",
    ratingAverage: "4.8",
    ratingCount: "1500",
    price: "49.99",
    discountPrice: "29.99",
    tag: "New",
    imageUrl: "https://example.com/javascript-essentials.jpg",
  },

  {
    id: 2,
    category: "Web development",
    subcategory: "Python",
    courseTitle: "Python for Data Science",
    teacherName: "Jane Smith",
    courseDescription:
      "Learn Python with a focus on data analysis and visualization.",
    ratingAverage: "4.7",
    ratingCount: "2000",
    price: "59.99",
    discountPrice: null,
    tag: null,
    imageUrl: "https://example.com/python-data-science.jpg",
  },

  {
    id: 3,
    category: "Web development",
    subcategory: "React",
    courseTitle: "React and Redux Mastery",
    teacherName: "Chris Johnson",
    courseDescription:
      "Master React and Redux for building dynamic, modern web applications.",
    ratingAverage: "4.9",
    ratingCount: "1800",
    price: "69.99",
    discountPrice: "49.99",
    tag: "Best seller",
    imageUrl: "https://example.com/react-redux-mastery.jpg",
  },

  {
    id: 4,
    category: "Data Science",
    subcategory: "Python",
    courseTitle: "Data Science with Python",
    teacherName: "Emily Davis",
    courseDescription:
      "Learn data analysis, visualization, and machine learning with Python.",
    ratingAverage: "4.8",
    ratingCount: "1500",
    price: "89.99",
    discountPrice: "69.99",
    tag: "Top rated",
    imageUrl: "https://example.com/data-science-python.jpg",
  },

  {
    id: 5,
    category: "Design",
    subcategory: "UX/UI",
    courseTitle: "UX/UI Design Essentials",
    teacherName: "Michael Smith",
    courseDescription:
      "Gain skills in user experience and user interface design.",
    ratingAverage: "4.7",
    ratingCount: "1200",
    price: "79.99",
    discountPrice: "59.99",
    tag: "Popular",
    imageUrl: "https://example.com/ux-ui-design.jpg",
  },

  {
    id: 6,
    category: "Marketing",
    subcategory: "Digital Marketing",
    courseTitle: "Complete Digital Marketing Bootcamp",
    teacherName: "Sarah Lee",
    courseDescription:
      "A comprehensive guide to digital marketing strategies and tools.",
    ratingAverage: "4.6",
    ratingCount: "2000",
    price: "99.99",
    discountPrice: "79.99",
    tag: "Featured",
    imageUrl: "https://example.com/digital-marketing.jpg",
  },

  {
    id: 7,
    category: "Business",
    subcategory: "Entrepreneurship",
    courseTitle: "Startup Success Formula",
    teacherName: "James Brown",
    courseDescription: "Learn how to build and scale successful startups.",
    ratingAverage: "4.5",
    ratingCount: "900",
    price: "109.99",
    discountPrice: "89.99",
    tag: "Trending",
    imageUrl: "https://example.com/startup-success.jpg",
  },

  {
    id: 8,
    category: "Photography",
    subcategory: "Portrait Photography",
    courseTitle: "Portrait Photography Masterclass",
    teacherName: "Jessica Wilson",
    courseDescription: "Master the art of capturing stunning portraits.",
    ratingAverage: "4.9",
    ratingCount: "1100",
    price: "119.99",
    discountPrice: "99.99",
    tag: "Expert",
    imageUrl: "https://example.com/portrait-photography.jpg",
  },
];

function HomePage() {
  return (
    <div className={styles.container_main}>
      <h1>Home</h1>

      <WelcomeMessage />

      <section>
        <SearchCoursesInput />
      </section>

      <section>
        <IntroCarousel />
      </section>

      <section>
        <ShowCase>
          <h1>Continue Learning</h1>
          <CourseListDisplay courseList={courseList} />
        </ShowCase>
      </section>

      <section>
        <ShowCase>
          <h1>Popular Courses</h1>
          <CourseListDisplay courseList={courseList} />
        </ShowCase>
      </section>
    </div>
  );
}

export default HomePage;
