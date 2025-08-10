// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.

  //   const result = [
  //     {
  //       id: 125,
  //       avg: 0.985, // (47 + 150) / (50 + 150)
  //       1: 0.94, // 47 / 50
  //       2: 1.0 // 150 / 150
  //     },
  //     {
  //       id: 132,
  //       avg: 0.82, // (39 + 125) / (50 + 150)
  //       1: 0.78, // 39 / 50
  //       2: 0.833 // late: (140 - 15) / 150
  //     }
  //   ];

  /////////////// **** FIRST STEP ***** //////////////////////////////////
 
  try {
    if (ag.course_id !== course.id) {
      throw new Error("The AssignmentGroup does not match the course provided");
    }

    const today = new Date();

    //////////// *** ÉTAPE 1 //////////////////////
    const assignmentsDue = ag.assignments.filter((assign) => {
      if (!assign.due_at) return false;
      let dueDate = new Date(assign.due_at);
      return dueDate <= today;
    });

    const validAssignments = assignmentsDue.filter((assign) => {
      if (
        typeof assign.points_possible !== "number" ||
        assign.points_possible <= 0
      ) {
        console.warn(
          `Assignment ${assign.id} skipped: invalid points_possible`
        );
        return false;
      }
      return true;
    });

    console.log("\n Step 1 - Valid Assignments :", validAssignments);

    ////////////**** Step 2 : Organize ////////////////////
    function organizeAssignmentsById(assignments) {
      let organized = {};

      for (let assign of assignments) { // Loop : first type
        if (!assign.id) {
          console.warn("Assignment without ID skipped");
          continue; // control key-word
        }
        // We create a new object without the "description" property (deletion example)
        let { description, ...assignData } = assign;
        organized[assign.id] = assignData;
      }

      return organized;
    }

    // Creating a quick search structure by ID
    let assignmentsMap = organizeAssignmentsById(validAssignments);

    // Example of using another type of loop for verification
    Object.keys(assignmentsMap).forEach((id) => { // Loop : 2nd type
      console.log(`Assignment ${id} ready for lookup`);
    });

    return assignmentsMap;

  } catch (error) {
    console.error("Error in getLearnerData :", error.message);
    return {};
  }
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log("\n Step 2 - Organized Assignments Map:", result);