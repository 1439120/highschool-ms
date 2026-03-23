using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Data;
using Microsoft.EntityFrameworkCore;
using HighSchoolManagementApi.Dtos.SubjectTopic;

namespace HighSchoolManagementApi.Repository
{
    public class SubjectTopicRepository: ISubjectTopicRepository
    {
        private readonly ApplicationDBContext _context;
        public SubjectTopicRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<SubjectTopics>> GetTopicsBySubjectPlan(int subjectId)
        {
            return await _context
                .SubjectTopics
                .Include(s => s.Objectives)
                .Include(s => s.Lessons)
                .Where(s => s.SubjectPlanId == subjectId)
                .ToListAsync();
        }
        public async Task<List<SubjectTopics>> GetTopicsByTerms(int subjectId, int term){
            return await _context
                .SubjectTopics
                .Where(s => s.SubjectPlanId == subjectId && s.Term == term)
                .ToListAsync();
        }
        public async Task<SubjectTopics> AddNewTopic(SubjectTopics topic)
        {
            await _context.SubjectTopics.AddAsync(topic);
            await _context.SaveChangesAsync();
            return topic;
        }
        public async Task<SubjectTopics?> EditSubjectTopic(int topicId, EditSubjectTopicDto topic)
        {
            var topicsModel = await _context.SubjectTopics.FirstOrDefaultAsync(x => x.Id == topicId);
            if(topicsModel == null) return null;

            topicsModel.Name = topic.Name;
            topicsModel.Term = topic.Term;
            topicsModel.StartWeek = topic.StartWeek;
            topicsModel.EndWeek = topic.EndWeek;
            topicsModel.Progress = topic.Progress;
            topicsModel.Description = topic.Description;
            topicsModel.LastUpdatedOn = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return topicsModel;
        }
        public async Task<LessonObjectives> AddNewTopicObjective(LessonObjectives objective)
        {
            await _context.LessonObjectives.AddAsync(objective);
            await _context.SaveChangesAsync();
            return objective;
        }
        public async Task<List<LessonObjectives>> AddMultipleObjectives(List<LessonObjectives> objectives)
        {
            _context.LessonObjectives.AddRange(objectives);
            await _context.SaveChangesAsync();
            return objectives;
        }
        public async Task<List<LessonObjectives>> RemoveAllObjectives(int topicId)
        {
            var objectives = await _context
                .LessonObjectives
                .Where(x => x.TopicId == topicId)
                .ToListAsync();
            _context.LessonObjectives.RemoveRange(objectives);
            await _context.SaveChangesAsync();
            return objectives;
        }
        public async Task<Lessons> AddNewLesson(Lessons lesson)
        {
            await _context.Lessons.AddAsync(lesson);
            await _context.SaveChangesAsync();
            return lesson;
        }
        public async Task<List<Lessons>> AddMultipleLesson(List<Lessons> lessons)
        {
            _context.Lessons.AddRange(lessons);
            await _context.SaveChangesAsync();
            return lessons;
        }
        public async Task<List<Lessons>> RemoveAllLesson(int topicId)
        {
            var lessons = await _context
                .Lessons
                .Where(x => x.TopicId == topicId)
                .ToListAsync();
            _context.Lessons.RemoveRange(lessons);
            await _context.SaveChangesAsync();
            return lessons;
        }
        public async Task<SubjectTopics?> DeleteTopic(int topicId)
        {
            var topic = await _context
                .SubjectTopics
                .FirstOrDefaultAsync(s => s.Id == topicId);
            if(topic == null) return null;
            _context.SubjectTopics.Remove(topic);
            await _context.SaveChangesAsync();

            return topic;
        }
        public async Task<LessonObjectives?> DeleteObjective(int objectiveId)
        {
            var objective = await _context
                .LessonObjectives
                .FirstOrDefaultAsync(s => s.Id == objectiveId);
            if(objective == null) return null;
            _context.LessonObjectives.Remove(objective);
            await _context.SaveChangesAsync();

            return objective;
        }
        public async Task<Lessons?> DeleteLesson(int lessonId)
        {
            var lesson = await _context
                .Lessons
                .FirstOrDefaultAsync(s => s.Id == lessonId);
            if(lesson == null) return null;
            _context.Lessons.Remove(lesson);
            await _context.SaveChangesAsync();

            return lesson;
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