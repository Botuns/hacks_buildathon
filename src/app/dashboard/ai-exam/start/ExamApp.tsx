// import { useEffect, useState } from 'react'
// import { useExamStore } from './examStore'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Timer } from './Timer'
// import { Question } from './Question'
// import { ResultsModal } from './ResultsModal'
// import { sampleExam } from './sampleExam'

// export default function ExamApp() {
//   const { currentExam, startExam, finishExam, showResults } = useExamStore()
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

//   useEffect(() => {
//     if (!currentExam) {
//       startExam(sampleExam)
//     }
//   }, [currentExam, startExam])

//   if (!currentExam) {
//     return <div>Loading...</div>
//   }

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < currentExam.exam.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1)
//     }
//   }

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1)
//     }
//   }

//   const handleFinishExam = () => {
//     finishExam()
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <Card>
//         <CardHeader>
//           <CardTitle>{currentExam.exam.title}</CardTitle>
//           <Timer />
//         </CardHeader>
//         <CardContent>
//           <Question question={currentExam.exam.questions[currentQuestionIndex]} />
//           <div className="flex justify-between mt-4">
//             <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
//               Previous
//             </Button>
//             {currentQuestionIndex === currentExam.exam.questions.length - 1 ? (
//               <Button onClick={handleFinishExam}>Finish Exam</Button>
//             ) : (
//               <Button onClick={handleNextQuestion}>Next</Button>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//       {showResults && <ResultsModal />}
//     </div>
//   )
// }