using System.Data;

namespace PersonalSite.DAC.Base
{
    public interface IDbExecutor
    {
        /// <summary>
        /// 執行非查詢類型的 SQL 指令，例如 INSERT、UPDATE、DELETE
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="param"></param>
        /// <param name="tx"></param>
        /// <param name="timeoutSec"></param>
        /// <param name="ct"></param>
        /// <returns>受影響的資料列數</returns>
        Task<int> ExecuteAsync(
            string sql, object? param = null, IDbTransaction? tx = null,
            int? timeoutSec = null, CancellationToken ct = default);

        /// <summary>
        /// 查詢單筆資料，並回傳指定型別的物件
        /// </summary>
        /// <typeparam name="T">回傳物件的型別</typeparam>
        /// <param name="sql"></param>
        /// <param name="param"></param>
        /// <param name="tx"></param>
        /// <param name="timeoutSec"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        Task<T?> QuerySingleAsync<T>(
            string sql, object? param = null, IDbTransaction? tx = null,
            int? timeoutSec = null, CancellationToken ct = default);

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="param"></param>
        /// <param name="tx"></param>
        /// <param name="timeoutSec"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        Task<IEnumerable<T>> QueryAsync<T>(
            string sql, object? param = null, IDbTransaction? tx = null,
            int? timeoutSec = null, CancellationToken ct = default);
    }
}
