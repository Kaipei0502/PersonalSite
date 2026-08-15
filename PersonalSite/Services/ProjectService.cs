using PersonalSite.Models;
using PersonalSite.DAC.Project;

namespace PersonalSite.Services
{
    public interface IProjectService
    {
        Task<List<ProjectModel>> GetProjectsAsync();
        Task<List<ProjectModel>> GetFeaturedProjectsAsync();
    }

    public class ProjectService : IProjectService
    {
        private readonly IProjectDac _projectDac;

        public ProjectService(IProjectDac projectDac)
        {
            _projectDac = projectDac;
        }

        public async Task<List<ProjectModel>> GetProjectsAsync()
        {
            var projects = (await _projectDac.GetAllProjectsAsync()).ToList();

            foreach (var project in projects)
            {
                project.TECHNOLOGIES = (await _projectDac
                    .GetProjectTechnologiesAsync(project.ID))
                    .ToList();
            }

            return projects;
        }

        public async Task<List<ProjectModel>> GetFeaturedProjectsAsync()
        {
            var projects = await GetProjectsAsync();
            return projects.Take(3).ToList();
        }
    }
}
