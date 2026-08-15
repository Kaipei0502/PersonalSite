using PersonalSite.DAC.Base;
using PersonalSite.Models;
using System.Data;
using Microsoft.Extensions.Logging;

namespace PersonalSite.DAC.Project
{
    public class ProjectDac : BaseDac, IProjectDac
    {
        public ProjectDac(IDbConnection conn, ILogger<ProjectDac> logger)
            : base(conn, logger)
        {
        }

        /// <summary>
        /// 取得所有專案列表
        /// 資料表: PROJECT (全大寫)
        /// 欄位: ID, TITLE, CATEGORY, DESCRIPTION, IMAGE_URL, PROJECT_URL (全大寫加底線)
        /// </summary>
        public async Task<IEnumerable<ProjectModel>> GetAllProjectsAsync()
        {
            string sql = @"
                SELECT
                    ID,
                    TITLE,
                    CATEGORY,
                    DESCRIPTION,
                    IMAGE_URL,
                    PROJECT_URL
                FROM PROJECT (NOLOCK)
                ORDER BY ID DESC";

            return await QueryAsync<ProjectModel>(sql);
        }

        /// <summary>
        /// 取得專案所使用的技術清單
        /// 資料表: PROJECT_TECHNOLOGY (全大寫加底線)
        /// </summary>
        public async Task<IEnumerable<string>> GetProjectTechnologiesAsync(int projectId)
        {
            string sql = @"
                SELECT TECH_NAME
                FROM PROJECT_TECHNOLOGY (NOLOCK)
                WHERE PROJECT_ID = @ProjectId
                ORDER BY ID ASC";

            return await QueryAsync<string>(sql, new { ProjectId = projectId });
        }
    }
}
