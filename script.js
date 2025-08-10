// Les données fournies (pour rappel)
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

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
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
  try {
    ////////////////////////////////////* STEP 1 /////////////////////////////////////
    // Check that the assignment group matches the course
    if (ag.course_id !== course.id) {
      throw new Error("The AssignmentGroup does not match the course provided");
    }

    const today = new Date();

    // Filter assignments already due (due_at <= today)
    const assignmentsDue = ag.assignments.filter((assign) => {
      if (!assign.due_at) return false;
      let dueDate = new Date(assign.due_at);
      return dueDate <= today;
    });

    // Keep only those with valid points_possible (>0)
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

    ////////////////////////////** STEPE 2 ///////////////////////////////////////////

    //Organize assignments by ID for quick access
    function organizeAssignmentsById(assignments) {
      let organized = {};

      for (let assign of assignments) { // Loop (First type : for...of)  
        if (!assign.id) {
          console.warn("Assignment without ID skipped");
          continue; // key-word continue
        }
        // delete a property example: description (nonexistent here)
        let { description, ...assignData } = assign;
        organized[assign.id] = assignData;
      }

      return organized;
    }

    let assignmentsMap = organizeAssignmentsById(validAssignments);

    Object.keys(assignmentsMap).forEach((id) => { // Loop : second type
      console.log(`Assignment ${id} ready for lookup`);
    });

    //////////////////////////*** STEPE 3 ///////////////////////////////////////////////
    // Browse submissions and calculate normalized scores per assignment
    let learnersMap = {}; // key = learner_id, value = object with scores

    for (let sub of submissions) {
      try {
        const learnerId = sub.learner_id;
        const assignment = assignmentsMap[sub.assignment_id];

        // Skip if assignment invalid (not in assignmentsMap)
        if (!assignment) {
          console.warn(`Assignment ID ${sub.assignment_id} non valide, ignoré.`);
          continue;
        }

        // Data validation
        const pointsPossible = assignment.points_possible;
        const score = sub.submission.score;
        if (typeof score !== "number" || typeof pointsPossible !== "number") {
          console.warn(`Score ou points invalides pour learner ${learnerId}, assignment ${assignment.id}`);
          continue;
        }

        // Late penalty calculation (10% points possible) if submitted after the due date
        const dueDate = new Date(assignment.due_at);
        const submittedAt = new Date(sub.submission.submitted_at);
        let effectiveScore = score;
        if (submittedAt > dueDate) {
          effectiveScore = Math.max(0, score - 0.1 * pointsPossible);
        }

        // Initialize the learner object if it does not yet exist
        if (!learnersMap[learnerId]) {
          learnersMap[learnerId] = { id: learnerId, scores: {}, totalWeightedScore: 0, totalPoints: 0 };
        }

        
       // Calculation of the normalized score (in percentage)
        const normalizedScore = effectiveScore / pointsPossible;
        learnersMap[learnerId].scores[assignment.id] = normalizedScore;

        // Cumulate for weighted average (weighting by points_possible)
        learnersMap[learnerId].totalWeightedScore += effectiveScore;
        learnersMap[learnerId].totalPoints += pointsPossible;

      } catch (err) {
        console.error("Erreur dans la boucle des soumissions:", err.message);
      }
    }

    ///////////////////////////////////////////**** STEPE 4 ///////////////////////////////
    // Calculate the final weighted average for each learner
    let learnersResults = [];

    for (let learnerId in learnersMap) {
      let learnerData = learnersMap[learnerId];
      let avg = 0;
      if (learnerData.totalPoints > 0) {
        avg = learnerData.totalWeightedScore / learnerData.totalPoints;
      }
      learnersResults.push({
        id: learnerData.id,
        avg: avg,
        ...learnerData.scores
      });
    }

    ////////////////////////////////////////****** STEPE 5 ////////////////////////////////
    // Here, the final construction of the object is already done in Step 4
   // We can return directly
    return learnersResults;

  } catch (error) {
    console.error("Error in getLearnerData :", error.message);
    return [];
  }
}

// Execution and display of the result
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log("\n Résultat final :", result);
