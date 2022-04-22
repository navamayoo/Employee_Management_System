import React from "react";
//Icons
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BusinessIcon from '@mui/icons-material/Business';
//import MenuBookIcon from "@mui/icons-material/MenuBook";

//Components
import Employee from "../pages/Employee/Employee";
import Department from "../pages/Department/Department";
//import CourseStudent from "../../pages/Admin/CourseStudents/CourseStudent";

export const routes = [
  {
    path: "/",
    component: <Employee />,
    label: "Employee",
    icon: <PeopleAltIcon />,
  },
  {
    path: "/department",
    component: <Department/>,
    label: "Department",
    icon: <BusinessIcon />,
  },
//   {
//     path: "/course-student",
//     component: <CourseStudent />,
//     label: "Course-Student",
//     icon: <MenuBookIcon />,
//   },
];