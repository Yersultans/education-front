import { denormalize, schema } from 'normalizr';

export const lesson = new schema.Entity('lessons', {}, { idAttribute: '_id' });
export const category = new schema.Entity('categories', {}, { idAttribute: '_id' });
export const project = new schema.Entity('projects', {}, { idAttribute: '_id' });
export const profileProject = new schema.Entity('profileProjects', {}, { idAttribute: '_id' });

export const userLesson = new schema.Entity(
  'userLessons',
  { lessons: [lesson] },
  { idAttribute: '_id' },
);

export const userProject = new schema.Entity(
  'userProjects',
  { userLessons: [userLesson] },
  { idAttribute: '_id' },
);

export const getCategoriesFromState = (state) => {
  const data = denormalize(Array.from(Object.keys(state.categories)), [category], state);
  return data.length > 0 ? data : null;
};

export const getUserProjectFromState = (projectId, state) => {
  const data = denormalize(projectId, userProject, state);
  return data;
};

export const getUserLessonFromState = (lessonId, state) => {
  const data = denormalize(lessonId, userLesson, state);
  return data;
};

export const getProjectsFromState = (state) => {
  const projects = denormalize(Array.from(Object.keys(state.projects)), [project], state);
  return projects.length > 0 ? projects : null;
};

export const getProfileProjectsFromState = (state) => {
  const profileProjects = denormalize(
    Array.from(Object.keys(state.profileProjects)),
    [profileProject],
    state,
  );
  return profileProjects.length > 0 ? profileProjects : null;
};
