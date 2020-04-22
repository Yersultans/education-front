const getBackendUrl = () => {
  if (!process.browser) {
    return process.env.BACKEND_URL || 'https://warm-cliffs-58797.herokuapp.com'
  }

  return (
    (window.env && window.env.BACKEND_URL) ||
    'https://warm-cliffs-58797.herokuapp.com'
  )
}

// const getBackendUrl = () => 'https://www.wunder.kz';

const getEndpoints = () => ({
  currentUser: `${getBackendUrl()}/api/auth/current_user`,
  deleteLesson: `${getBackendUrl()}/api/deleteAdminProgress`,
  deleteUserHintProgress: `${getBackendUrl()}/api/userHint/`,
  fetchCategories: `${getBackendUrl()}/api/categories`,
  fetchPoints: `${getBackendUrl()}/api/userPoints`,
  fetchUserLesson: `${getBackendUrl()}/api/progress/getUserLesson`,
  finishLesson: `${getBackendUrl()}/api/progress/finishLesson`,
  getProjectWithProgress: `${getBackendUrl()}/api/progress/getProjectWithProgress`,
  getProbableChapterPoints: `${getBackendUrl()}/api/getProbableChapterPoints`,
  getUserProgress: `${getBackendUrl()}/api/progress/getUserProgress`,
  openGlobalHint: `${getBackendUrl()}/api/userLesson/addGlobalHint`,
  openHint: `${getBackendUrl()}/api/userLesson/addHint`,
  postLessonDuration: `${getBackendUrl()}/api/progress/userLessonDuration`,
  projectsWithProgress: `${getBackendUrl()}/api/progress/getProjectsWithProgress`,
  socketDevEndpoint: 'http://localhost:5001',
  socketProdEndpoint: getBackendUrl(),
  uploadToS3: `${getBackendUrl()}/api/uploadImageToS3`,

  fetchNCourses: `${getBackendUrl()}/api/nCourses`,
  finishActivity: `${getBackendUrl()}/api/progress/finishActivity`,
  getUsersBySchoolId: `${getBackendUrl()}/api/schoolUsersBySchoolId`,
  getTeachersBySchoolId: `${getBackendUrl()}/api/getSchoolTeachersBySchoolId`,

  createClass: `${getBackendUrl()}/api/classes`,
  getSchoolClassesBySchoolId: `${getBackendUrl()}/api/classesBySchoolId`,
  deleteClass: `${getBackendUrl()}/api/classes/`,
  getActivitiesByLessonId: `${getBackendUrl()}/api/activitiesByLessonId`,
  getSchoolUsersByClassId: `${getBackendUrl()}/api/schoolUsersByClassId`,
  deleteUser: `${getBackendUrl()}/api/users/`,
  createSchoolUser: `${getBackendUrl()}/api/users`,
  updateSchoolUser: `${getBackendUrl()}/api/users/`,
  getLessonWithActivities: `${getBackendUrl()}/api/nLesson`,
  getLessonWithProgress: `${getBackendUrl()}/api/progress/getLessonWithProgress`,
  checkNQuiz: `${getBackendUrl()}/api/checkNQuiz/`,
  getSchoolClass: `${getBackendUrl()}/api/classes`,
  updateClass: `${getBackendUrl()}/api/classes`,
  nCourse: `${getBackendUrl()}/api/nCourse/`,
  getNCourse: `${getBackendUrl()}/api/nCourse`,
  nLessons: `${getBackendUrl()}/api/nLessons`,
  nLesson: `${getBackendUrl()}/api/nLesson/`
})

export default getEndpoints
