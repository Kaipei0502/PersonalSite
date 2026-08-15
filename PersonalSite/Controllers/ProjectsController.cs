using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using PersonalSite.Models;
using PersonalSite.Services;

namespace PersonalSite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowFrontend")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProjectModel>>> GetAll()
        {
            var projects = await _projectService.GetProjectsAsync();
            return Ok(projects);
        }

        [HttpGet("featured")]
        public async Task<ActionResult<List<ProjectModel>>> GetFeatured()
        {
            var projects = await _projectService.GetFeaturedProjectsAsync();
            return Ok(projects);
        }
    }
}
