import React from "react";

interface Course {
  id: number;
  title: string;
  description: string;
  duration: number;
}

const CourseList: React.FC<{ courses: Course[] }> = ({ courses }) => {
  return (
    <ul>
      {courses.map((course) => (
        <li key={course.id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <p>Duration: {course.duration} minutes</p>
        </li>
      ))}
    </ul>
  );
};

export default CourseList;
