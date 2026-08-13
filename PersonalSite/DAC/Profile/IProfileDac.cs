using PersonalSite.Models;

namespace PersonalSite.DAC.Profile
{
    public interface IProfileDac
    {
        Task<ProfileModel?> GetProfile();
        Task<IEnumerable<ExperienceModel>> GetExperiences();
        Task<IEnumerable<SkillCategoryModel>> GetSkillCategories();
        Task<IEnumerable<SkillModel>> GetSkills();
        Task<IEnumerable<string>> GetExperienceHighlights(int experienceId);
        Task<IEnumerable<string>> GetExperienceSkills(int experienceId);
    }
}
