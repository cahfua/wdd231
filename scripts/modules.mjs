import byuiCourse from "./course.mjs";
import { setSectionSelection } from "./sections.mjs";
import { setTitle, renderSections } from "./output.mjs";

// initial setup
setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);

// event listeners
document
  .querySelector("#enrollStudent")
  .addEventListener("click", function () {
    const sectionNum = Number(
      document.querySelector("#sectionNumber").value
    );
    byuiCourse.changeEnrollment(sectionNum);
    renderSections(byuiCourse.sections); // update table
  });

document
  .querySelector("#dropStudent")
  .addEventListener("click", function () {
    const sectionNum = Number(
      document.querySelector("#sectionNumber").value
    );
    byuiCourse.changeEnrollment(sectionNum, false);
    renderSections(byuiCourse.sections); // update table
  });
