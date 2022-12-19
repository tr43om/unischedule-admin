import { Routes, Route } from "react-router-dom";
import {
  CourseFormPage,
  HomePage,
  LayoutPage,
  ScheduleDetailsPage,
  SubjectFormPage,
  ProfessorFormPage,
} from "./pages";
import { RoutesPaths } from "./types";

function App() {
  return (
    <Routes>
      <Route path={RoutesPaths.home} element={<LayoutPage />}>
        <Route index element={<HomePage />} />
        <Route path={RoutesPaths.course} element={<CourseFormPage />} />
        <Route path={RoutesPaths.subject} element={<SubjectFormPage />} />
        <Route
          path={RoutesPaths.scheduleDetails}
          element={<ScheduleDetailsPage />}
        />
        <Route path={RoutesPaths.professor} element={<ProfessorFormPage />} />
      </Route>
    </Routes>
  );
}

export default App;
