import React, { lazy, Suspense, useMemo, useState, useTransition } from "react";
import "./App.css";
import { useCourses } from "./hooks/useCourses";

const CourseList = lazy(() => import("./components/CourseList"));

const App: React.FC = () => {
  const { data: courses, isLoading, error } = useCourses();
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 2;

  const [isPending, startTransition] = useTransition();

  const currentCourses = useMemo(() => {
    if (!courses) {
      return [];
    }
    const indexOffLastCourse = currentPage * coursesPerPage;
    const indexOffFirstCourse = indexOffLastCourse - coursesPerPage;
    return courses?.slice(indexOffFirstCourse, indexOffLastCourse);
  }, [courses, currentPage, coursesPerPage]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error {error.message}</p>;
  }

  if (!courses) {
    return <p>No courses found</p>;
  }

  return (
    <section>
      <h1>📑Learning courses 📚</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CourseList courses={currentCourses} />
      </Suspense>
      <div>
        {Array.from(
          { length: Math.ceil(courses.length / coursesPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => {
                startTransition(() => {
                  setCurrentPage(index + 1);
                });
              }}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
      {isPending && <div>Loading new page...</div>}
    </section>
  );
};

export { App };
