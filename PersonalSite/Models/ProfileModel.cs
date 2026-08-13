using System.Text.Json.Serialization;

namespace PersonalSite.Models
{
    public class ProfileModel
    {
        public string NAME { get; set; } = string.Empty;
        public string TITLE { get; set; } = string.Empty;
        public string DESCRIPTION { get; set; } = string.Empty;
        public string? ABOUT_DESCRIPTION { get; set; }
        public string RESUME_LINK { get; set; } = string.Empty;
        public List<ExperienceModel> EXPERIENCES { get; set; } = new();
        public List<SkillCategoryModel> SKILL_CATEGORIES { get; set; } = new();
    }

    /// <summary>
    /// 工作經驗
    /// </summary>
    public class ExperienceModel
    {
        public int ID { get; set; }
        public string COMPANY { get; set; } = string.Empty;
        public string ROLE { get; set; } = string.Empty;
        public DateTime ST_DATE { get; set; }
        public DateTime END_DATE { get; set; }
        public string SUMMARY { get; set; } = string.Empty;
        public List<string> HIGHLIGHTS { get; set; } = new();
        public List<string> SKILLS { get; set; } = new();
    }

    /// <summary>
    /// 個人技能分類
    /// </summary>
    public class SkillCategoryModel
    {
        public int ID { get; set; }
        public string NAME { get; set; } = string.Empty;
        public string DESCRIPTION { get; set; } = string.Empty;
        public int DISPLAY_ORDER { get; set; }
        public List<SkillModel> SKILLS { get; set; } = new();
    }

    /// <summary>
    /// 個人技能
    /// </summary>
    public class SkillModel
    {
        public int ID { get; set; }
        [JsonIgnore]
        public int CATEGORY_ID { get; set; }
        public string NAME { get; set; } = string.Empty;
        public int DISPLAY_ORDER { get; set; }
    }
}

