import React, { lazy } from "react";

const CourseManagementComponent = lazy(
  () => import("../../../components/instructor/course/CourseManagement"),
);

export const CourseManagement: React.FC = () => {
  return <CourseManagementComponent />;
};
