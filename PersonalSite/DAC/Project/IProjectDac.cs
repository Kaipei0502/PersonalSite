using PersonalSite.Models;

namespace PersonalSite.DAC.Project
{
    public interface IProjectDac
    {
        Task<IEnumerable<ProjectModel>> GetAllProjectsAsync();
        Task<IEnumerable<string>> GetProjectTechnologiesAsync(int projectId);
    }
}
