# MathsLifter Architecture (Tutor + Student)

## Frontend Structure
- `src/pages/public`: landing, sign-in, sign-up
- `src/pages/tutor`: tutor dashboards and management views
- `src/pages/student`: student learning flow views
- `src/pages/shared`: cross-role pages (progress/settings)
- `src/features/pricing`: plan calculation model + UI component
- `src/components/common`: reusable UI primitives
- `src/components/layout`: app shell and public header
- `src/context`: auth/session state
- `src/firebase`: Firebase initialization + auth/firestore service layer
- `src/services/ai`: client-side contracts for server-side AI endpoints (mocked)
- `src/services/storage`: upload contract for handwritten work

## Firestore Model (Hybrid top-level collections)

- `users/{uid}`
  - `role` (`tutor` | `student`), profile basics, selected plan summary
- `tutorStudentAssignments/{assignmentId}`
  - `tutorId`, `studentId`, `status`, timestamps
- `subjects/{subjectId}`
- `grades/{gradeId}`
- `pastExamPapers/{paperId}`
  - metadata + storage path
- `studentReports/{reportId}`
  - tutor assessment and notes
- `studentPrograms/{programId}`
  - AI generated program summary
- `weeklyPlans/{weekPlanId}`
  - studentId, week, topic focus, targets
- `exercises/{exerciseId}`
  - difficulty, objective, source
- `submissions/{submissionId}`
  - student uploads + grading status
- `peerReviews/{reviewId}`
  - reviewerId, submissionId, feedback quality fields
- `aiMarkingResults/{resultId}`
  - submissionId, AI marks, weak areas
- `progressReports/{reportId}`
  - weekly progression snapshots
- `pricingPlans/{uid}`
  - selected tutoring plan and payment status

This model is scalable because heavy entities are isolated into top-level collections and connected by IDs, while user profile stays simple.

## AI Service Flow
1. Tutor writes report / uploads context.
2. Server-side AI endpoint receives student context and returns generated weekly plan.
3. Daily exercise generation endpoint adapts workload and topic progression.
4. Submission marking endpoint returns rubric + weaknesses.
5. Peer feedback review endpoint produces quality score.
6. Recommendation endpoint adjusts next exercises.

## Whiteboard Strategy
- Phase-ready upload + preview in submissions flow.
- Abstract annotation interface in `services/storage` + future `services/whiteboard`.
- tldraw integration can be mounted in submission review route without redesigning data layer.

## Extensibility
- AI services already abstracted behind function contracts.
- Role-based routing supports future role additions without changing all pages.
- Dashboard shell keeps reusable navigation and layout pattern.
