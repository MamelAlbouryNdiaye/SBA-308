# SBA-308
``I divided the progromme by step :``

## Step 1 : I filter the valid assignments (due assignents)

I start in getLearnerData(): filtering the assignments that are already due while managing validations.

### link betwin coure and AssignmentGroup 
```
 if (ag.course_id !== course.id) { 
            TODO...
        }
```
### Filtering the dues assignment :
```
    const assignmentsDue = ag.assignments.filter((assign) => {
       TODO...
    });
```
### Filter those with valid points_possible
```
const validAssignments = assignmentsDue.filter((assign) => {
     TODO...
})
```
## Step 2 : Organize assignments to find them easily
 What we have inside : (For the requirement)
  ```
    function organizeAssignmentsById(assignments) {
        * Organization: Transforms the array of filtered assignments into an {id: data} object for quick searches.

        * Loop control: Continue to skip assignments without an ID.
        Loops :
        * first type : for...of
        * second type : forEach()
        * Manipulation/deletion: Removes the description property to streamline the stored data.
        * Utility function organizeAssignmentsById() isolates the transformation logic.

    }
  ```
## Step 3: Loop through all submissions:

  * Ignore those whose assignment is not in the map (invalid).

  * Manage late penalties (-10% of possible points).

  * Normalize scores between 0 and 1 (score/possible_points).

  * Store in an intermediate object per learner.

## Step 4: Calculate the weighted average per learner: 

sum of scores  possible points / sum of possible points.

## Step 5: Build and return the final array of objects 

With id, avg, and a key for each assignment with the grade in %.




  


   
   



