using Dapper;
using System.Data;
using System.Diagnostics;

namespace PersonalSite.DAC.Base
{
    public abstract class BaseDac : IDbExecutor
    {
        protected readonly IDbConnection Conn;
        protected readonly ILogger<BaseDac> Logger;

        protected BaseDac(IDbConnection conn, ILogger<BaseDac> logger)
        {
            Conn = conn;
            Logger = logger;
        }

        /// <summary>
        /// 執行非查詢 SQL，並回傳影響筆數
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="param"></param>
        /// <param name="tx"></param>
        /// <param name="timeoutSec"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        public Task<int> ExecuteAsync(
            string sql, object? param = null, IDbTransaction? tx = null,
            int? timeoutSec = null, CancellationToken ct = default)
            => ExecCore(async def => await Conn.ExecuteAsync(def), sql, param, tx, timeoutSec, ct);

        /// <summary>
        /// 查詢單筆資料
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="param"></param>
        /// <param name="tx"></param>
        /// <param name="timeoutSec"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        public Task<T?> QuerySingleAsync<T>(
            string sql, object? param = null, IDbTransaction? tx = null,
            int? timeoutSec = null, CancellationToken ct = default)
            => ExecCore(async def => await Conn.QuerySingleOrDefaultAsync<T>(def), sql, param, tx, timeoutSec, ct);

        /// <summary>
        /// 查詢多筆資料
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="param"></param>
        /// <param name="tx"></param>
        /// <param name="timeoutSec"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        public Task<IEnumerable<T>> QueryAsync<T>(
            string sql, object? param = null, IDbTransaction? tx = null,
            int? timeoutSec = null, CancellationToken ct = default)
            => ExecCore(async def => await Conn.QueryAsync<T>(def), sql, param, tx, timeoutSec, ct);

        /// <summary>
        /// 傳入Model
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="model"></param>
        /// <param name="tx"></param>
        /// <param name="timeoutSec"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        protected Task<int> ExecuteCommandWithObjectAsync(
            string sql, object? model, IDbTransaction? tx = null,
            int? timeoutSec = null, CancellationToken ct = default)
            => ExecuteAsync(sql, model, tx, timeoutSec, ct);

        private async Task<T> ExecCore<T>(
            Func<CommandDefinition, Task<T>> invoker,
            string sql, object? param, IDbTransaction? tx, int? timeoutSec, CancellationToken ct)
        {
            var sw = Stopwatch.StartNew();
            try
            {
                var def = new CommandDefinition(
                    commandText: sql,
                    parameters: param,
                    transaction: tx,
                    commandTimeout: timeoutSec ?? 30,
                    cancellationToken: ct);

                var result = await invoker(def);
                return result;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "SQL FAIL ({Elapsed} ms)\n{Sql}\n@param: {Param}",
                    sw.ElapsedMilliseconds, sql, SafeSerialize(param));
                throw;
            }
            finally
            {
                sw.Stop();
            }
        }

        private static string SafeSerialize(object? obj)
        {
            try { return System.Text.Json.JsonSerializer.Serialize(obj); }
            catch { return "<param serialize failed>"; }
        }
    }
}
