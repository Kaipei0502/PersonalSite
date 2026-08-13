using PersonalSite.Models;
using PersonalSite.DAC.Profile;

namespace PersonalSite.Services
{
    public interface IProfileService
    {
        Task<ProfileModel> GetProfile();
    }

    public class ProfileService : IProfileService
    {
        private readonly IProfileDac profileDac;

        public ProfileService(IProfileDac profileDac)
        {
            this.profileDac = profileDac;
        }

        /// <summary>
        /// 取得完整的個人 Profile，包含工作經驗、項目亮點與技能
        /// </summary>
        public async Task<ProfileModel> GetProfile()
        {
            // 1. 取得基本資料
            var profile = await profileDac.GetProfile();
            if (profile == null)
            {
                return new ProfileModel();
            }

            // 2. 取得所有工作經驗
            var experiences = (await profileDac.GetExperiences()).ToList();

            // 3.遍歷工作經驗，查詢關聯的 Highlights 與 Skills
            foreach (var exp in experiences)
            {
                exp.HIGHLIGHTS = (await profileDac.GetExperienceHighlights(exp.ID)).ToList();
                exp.SKILLS = (await profileDac.GetExperienceSkills(exp.ID)).ToList();
            }

            profile.EXPERIENCES = experiences;

            var skillCategories = (await profileDac.GetSkillCategories()).ToList();
            var skillsByCategory = (await profileDac.GetSkills()).ToLookup(skill => skill.CATEGORY_ID);
            foreach (var category in skillCategories)
            {
                category.SKILLS = skillsByCategory[category.ID].ToList();
            }
            profile.SKILL_CATEGORIES = skillCategories;

            return profile;
        }
    }

}
