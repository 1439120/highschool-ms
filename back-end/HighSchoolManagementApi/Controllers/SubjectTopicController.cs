
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
        
        [HttpGet("{subjectPlanId:int}")]
        public async Task<IActionResult> GetSubjectTopics([FromRoute] int subjectPlanId)
        {
            var topics = await _topicRepo.GetTopicsBySubjectPlan(subjectPlanId);
            return Ok(topics.Select(t => t.FromSubjectTopicsToDto()).ToList());
        }
        [HttpPost]
        public async Task<IActionResult> AddNewTopic([FromBody] AddSubjectTopicDto topicDto)
        {
            var topic = await _topicRepo.AddNewTopic(topicDto.FromDtoToSubjectTopics());
            return Ok(topic);
        }
        [HttpPut("{topicId:int}")]
        public async Task<IActionResult> EditSubjectTopic([FromRoute] int topicId, [FromBody] EditSubjectTopicDto topicDto)
        {
            var topic = await _topicRepo.EditSubjectTopic(topicId, topicDto);
            return Ok(topic);
        }
        [HttpPost("objective")]
        public async Task<IActionResult> AddTopicObjective([FromBody] AddObjectiveDto objectiveDto)
        {
            var topic = await _topicRepo.AddNewTopicObjective(objectiveDto.FromDtoToLessonObjective());
            return Ok(topic);
        }
        [HttpPost("objective/all")]
        public async Task<IActionResult> AddTopicObjective([FromBody] List<AddObjectiveDto> objectiveDto)
        {
            var objectiveModel = objectiveDto.Select(dto => dto.FromDtoToLessonObjective()).ToList();
            var objectives = await _topicRepo.AddMultipleObjectives(objectiveModel);
            return Ok(objectives);
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