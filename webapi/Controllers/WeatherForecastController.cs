using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using webapi;

namespace TestProject2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Получает прогноз погоды.
        /// </summary>
        /// <remarks>
        /// Пример запроса:
        ///
        ///     GET /WeatherForecast
        ///     
        ///     headers:
        ///     Authorization: Bearer {токен}
        ///
        /// </remarks>
        /// <returns>Возвращает массив с прогнозами погоды.</returns>
        [HttpGet]
        [SwaggerOperation(Summary = "Получает прогноз погоды")]
        [SwaggerResponse(200, "Успешный ответ", typeof(IEnumerable<WeatherForecast>))]
        [SwaggerResponse(401, "Не авторизован", null)]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}