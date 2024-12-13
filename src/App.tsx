import React, { lazy } from "react";
import "./App.css";
import { useCourses } from "./hooks/useCourses";

const CourseList = lazy(() => import("./components/CourseList"));

const App: React.FC = () => {
  const { data: courses, isLoading, error } = useCourses();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error {error.message}</p>;
  }

  if (!courses) {
    return <p>No courses found</p>;
  }

  return <CourseList courses={} />;
};

export { App };
