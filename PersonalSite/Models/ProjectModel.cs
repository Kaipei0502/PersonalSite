namespace PersonalSite.Models
{
    public class ProjectModel
    {
        public int ID { get; set; }
        public string TITLE { get; set; } = string.Empty;
        public string CATEGORY { get; set; } = string.Empty; // e.g., "Full Stack", "Mobile"
        public string DESCRIPTION { get; set; } = string.Empty;
        public string IMAGE_URL { get; set; } = string.Empty; // Placeholder or real URL
        public List<string> TECHNOLOGIES { get; set; } = new List<string>();
        public string PROJECT_URL { get; set; } = string.Empty;
    }
}
