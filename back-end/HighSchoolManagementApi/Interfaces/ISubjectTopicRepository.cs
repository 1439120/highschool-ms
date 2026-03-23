using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.SubjectTopic;

namespace HighSchoolManagementApi.Interfaces
{
    public interface ISubjectTopicRepository
    {
        Task<List<SubjectTopics>> GetTopicsBySubjectPlan(int subjectId);
        Task<List<SubjectTopics>> GetTopicsByTerms(int subjectId, int term);
        Task<SubjectTopics> AddNewTopic(SubjectTopics topic);
        Task<SubjectTopics?> EditSubjectTopic(int topicId, EditSubjectTopicDto topic);
        Task<LessonObjectives> AddNewTopicObjective(LessonObjectives objective);
        Task<List<LessonObjectives>> AddMultipleObjectives(List<LessonObjectives> objectives);
        Task<Lessons> AddNewLesson(Lessons lesson);
        Task<SubjectTopics?> DeleteTopic(int topicId);
        Task<LessonObjectives?> DeleteObjective(int objectiveId);
        Task<Lessons?> DeleteLesson(int lessonId);
        Task<SubjectTopics> EditTopic(SubjectTopics topic);
        Task<LessonObjectives> EditObjective(LessonObjectives objective);
        Task<Lessons> EditLessons(Lessons lesson);
    }
}