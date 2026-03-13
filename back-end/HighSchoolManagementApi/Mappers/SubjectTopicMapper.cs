using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Dtos.SubjectTopic;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Mappers
{
    public static class SubjectTopicMapper
    {
        public static SubjectTopics FromDtoToSubjectTopics(this AddSubjectTopicDto topicDto)
        {
            return new SubjectTopics
            {
                Name = topicDto.Name,
                Term = topicDto.Term,
                StartWeek = topicDto.StartWeek,
                EndWeek = topicDto.EndWeek,
                Progress = topicDto.Progress,
                Description = topicDto.Description,
                SubjectPlanId = topicDto.SubjectPlanId,
            };
        }

        public static LessonObjectives FromDtoToLessonObjective(this AddObjectiveDto objectiveDto)
        {
            return new LessonObjectives
            {
                Name = objectiveDto.Name,
                TopicId = objectiveDto.TopicId,
            };
        }

        public static Lessons FromDtoToTopicLesson(this AddLessonDto lessonDto)
        {
            return new Lessons
            {
                Name = lessonDto.Name,
                Status = lessonDto.Status,
                Duration = lessonDto.Duration,
                TopicId = lessonDto.TopicId,
            };
        }

        public static ObjectiveDto FromObjectivesToDto(this LessonObjectives objective)
        {
            return new ObjectiveDto
            {
                Name = objective.Name,
            };
        }
        public static LessonsDto FromLessonsToDto(this Lessons lessons)
        {
            return new LessonsDto
            {
                Name = lessons.Name,
                Status = lessons.Status,
                Duration = lessons.Duration,
            };
        }
        public static SubjectTopicDto FromSubjectTopicsToDto(this SubjectTopics subjectTopic)
        {
            return new SubjectTopicDto
            {
                Id = subjectTopic.Id,
                Name = subjectTopic.Name,
                Term = subjectTopic.Term,
                StartWeek = subjectTopic.StartWeek,
                EndWeek = subjectTopic.EndWeek,
                Progress = subjectTopic.Progress,
                Description = subjectTopic.Description,
                Objectives = subjectTopic.Objectives.Select(o => o.FromObjectivesToDto()).ToList(),
                Lessons = subjectTopic.Lessons.Select(l => l.FromLessonsToDto()).ToList(),
            };
        }
    }
}