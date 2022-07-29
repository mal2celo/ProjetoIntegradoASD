using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Representantes.WebApi.Helpers;
using Representantes.WebApi.Models;
using Representantes.WebApi.Services;
using System.Threading.Tasks;

namespace Representantes.WebApi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class SincronismosController : ControllerBase
    {
        private readonly ISincronismoService _sincronismoService;

        public SincronismosController(ISincronismoService sincronismoService)
        {
            _sincronismoService = sincronismoService;
        }

        [Authorize]
        [HttpPost("sincronizar")]
        public IActionResult PostSincronizar(SincronizarRequest sincronizar)
        {
            var response = _sincronismoService.Sincronizar(sincronizar);

            if (response == null)
                return BadRequest(new { message = "Não foi possível sincronizar." });

            return Ok(response);
        }
    }
}
