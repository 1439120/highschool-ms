using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Data;

namespace HighSchoolManagementApi.Repository
{
    public class SubjectTopicRepository: ISubjectTopicRepository
    {
        private readonly ApplicationDBContext _context;
        public SubjectTopicRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<SubjectTopics>> GetTopicsBySubject(int subjectId)
        {
            var topics = new List<SubjectTopics>();
            return topics;
        }
        public async Task<List<SubjectTopics>> GetTopicsByTerms(int term){
            var topics = new List<SubjectTopics>();
            return topics;
        }
        public async Task<SubjectTopics> AddNewTopic(SubjectTopics topic)
        {
            return topic;
        }
        public async Task<LessonObjectives> AddNewLessonObjective(int topicId, LessonObjectives objective)
        {
            return objective;
        }
        public async Task<Lessons> AddNewLesson(int topicId, Lessons lesson)
        {
            return lesson;
        }
        public async Task<SubjectTopics?> DeleteTopic(int topicId)
        {
            return null;
        }
        public async Task<LessonObjectives?> DeleteObjective(int objectiveId)
        {
            return null;
        }
        public async Task<Lessons?> DeleteLesson(int lessonId)
        {
            return null;
        }
        public async Task<SubjectTopics> EditTopic(SubjectTopics topic)
        {
            return topic;
        }
        public async Task<LessonObjectives> EditObjective(LessonObjectives objective)
        {
            return objective;
        }
        public async Task<Lessons> EditLessons(Lessons lesson)
        {
            return lesson;
        }
    }
}