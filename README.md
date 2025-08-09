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
   
   



