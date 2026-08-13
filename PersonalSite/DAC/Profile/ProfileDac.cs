using PersonalSite.DAC.Base;
using PersonalSite.Models;
using System.Data;
using Microsoft.Extensions.Logging;

namespace PersonalSite.DAC.Profile
{
    public class ProfileDac : BaseDac, IProfileDac
    {
        public ProfileDac(IDbConnection conn, ILogger<ProfileDac> logger)
            : base(conn, logger)
        {
        }

        /// <summary>
        /// 取得個人基本資料
        /// </summary>
        public async Task<ProfileModel?> GetProfile()
        {
            string sql = @"
                SELECT TOP 1
                    NAME,
                    TITLE,
                    DESCRIPTION,
                    ABOUT_DESCRIPTION,
                    RESUME_LINK
                FROM PROFILE (NOLOCK)
                ORDER BY ID ASC";

            return await QuerySingleAsync<ProfileModel>(sql);
        }

        /// <summary>
        /// 取得所有工作經驗
        /// </summary>
        public async Task<IEnumerable<ExperienceModel>> GetExperiences()
        {
            string sql = @"
                SELECT
                    ID,
                    COMPANY,
                    ROLE,
                    ST_DATE,
                    END_DATE,
                    SUMMARY
                FROM EXPERIENCE (NOLOCK)
                ORDER BY ID DESC";

            return await QueryAsync<ExperienceModel>(sql);
        }

        /// <summary>
        /// 取得所有顯示中的技能分類
        /// </summary>
        public async Task<IEnumerable<SkillCategoryModel>> GetSkillCategories()
        {
            string sql = @"
                SELECT
                    ID,
                    NAME,
                    DESCRIPTION,
                    DISPLAY_ORDER
                FROM SKILL_CATEGORY (NOLOCK)
                WHERE IS_VISIBLE = 1
                ORDER BY DISPLAY_ORDER ASC, ID ASC";

            return await QueryAsync<SkillCategoryModel>(sql);
        }

        /// <summary>
        /// 取得顯示中分類內的所有顯示中技能
        /// </summary>
        public async Task<IEnumerable<SkillModel>> GetSkills()
        {
            string sql = @"
                SELECT
                    skill.ID,
                    skill.CATEGORY_ID,
                    skill.NAME,
                    skill.DISPLAY_ORDER
                FROM SKILL AS skill WITH (NOLOCK)
                INNER JOIN SKILL_CATEGORY AS category WITH (NOLOCK)
                    ON category.ID = skill.CATEGORY_ID
                WHERE skill.IS_VISIBLE = 1
                  AND category.IS_VISIBLE = 1
                ORDER BY category.DISPLAY_ORDER ASC,
                         category.ID ASC,
                         skill.DISPLAY_ORDER ASC,
                         skill.ID ASC";

            return await QueryAsync<SkillModel>(sql);
        }

        /// <summary>
        /// 取得特定工作經驗的亮點項目
        /// </summary>
        public async Task<IEnumerable<string>> GetExperienceHighlights(int experienceId)
        {
            string sql = @"
                SELECT HIGHLIGHT
                FROM EXPERIENCE_HIGHLIGHT (NOLOCK)
                WHERE EXPERIENCE_ID = @ExperienceId
                ORDER BY ID ASC";

            return await QueryAsync<string>(sql, new { ExperienceId = experienceId });
        }

        /// <summary>
        /// 取得特定工作經驗的技能標籤
        /// </summary>
        public async Task<IEnumerable<string>> GetExperienceSkills(int experienceId)
        {
            string sql = @"
                SELECT SKILL_NAME
                FROM EXPERIENCE_SKILL (NOLOCK)
                WHERE EXPERIENCE_ID = @ExperienceId
                ORDER BY ID ASC";

            return await QueryAsync<string>(sql, new { ExperienceId = experienceId });
        }
    }

}
