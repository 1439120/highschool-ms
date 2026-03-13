
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Interfaces;
using Microsoft.AspNetCore.Mvc;
using HighSchoolManagementApi.Dtos.SubjectTopic;
using HighSchoolManagementApi.Mappers;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/subject-topics")]
    [ApiController]
    public class SubjectTopicController: ControllerBase
    {
        private readonly ISubjectTopicRepository _topicRepo;
        public SubjectTopicController(ISubjectTopicRepository topicRepo)
        {
            _topicRepo = topicRepo;
        }
        
        [HttpGet("{subjectTopicId:int}")]
        public async Task<IActionResult> GetSubjectTopics([FromRoute] int subjectTopicId)
        {
            var topics = await _topicRepo.GetTopicsBySubject(subjectTopicId);
            return Ok(topics.Select(t => t.FromSubjectTopicsToDto()).ToList());
        }
        [HttpPost]
        public async Task<IActionResult> AddNewTopic([FromBody] AddSubjectTopicDto topicDto)
        {
            var topic = await _topicRepo.AddNewTopic(topicDto.FromDtoToSubjectTopics());
            return Ok(topic);
        }
        [HttpPost("objective")]
        public async Task<IActionResult> AddTopicObjective([FromBody] AddObjectiveDto objectiveDto)
        {
            var topic = await _topicRepo.AddNewTopicObjective(objectiveDto.FromDtoToLessonObjective());
            return Ok(topic);
        }
        [HttpPost("lessons")]
        public async Task<IActionResult> AddTopicLessons([FromBody] AddLessonDto lessonDto)
        {
            var topic = await _topicRepo.AddNewLesson(lessonDto.FromDtoToTopicLesson());
            return Ok(topic);
        }
        [HttpDelete("{topicId:int}")]
        public async Task<IActionResult> DeleteTopic([FromRoute] int topicId)
        {
            var topic = await _topicRepo.DeleteTopic(topicId);
            return Ok(topic);
        }
        [HttpDelete("objective/{subjectId:int}")]
        public async Task<IActionResult> DeleteObjective([FromRoute] int subjectId)
        {
            var topic = await _topicRepo.DeleteObjective(subjectId);
            return Ok(topic);
        }
        [HttpDelete("lessons/{lessonId:int}")]
        public async Task<IActionResult> DeleteLesson([FromRoute] int lessonId)
        {
            var topic = await _topicRepo.DeleteObjective(lessonId);
            return Ok(topic);
        }
    }
}