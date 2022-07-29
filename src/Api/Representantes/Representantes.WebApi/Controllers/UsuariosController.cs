using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Representantes.WebApi.Helpers;
using Representantes.WebApi.Models;
using Representantes.WebApi.Services;

namespace Representantes.WebApi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _userService;

        public UsuariosController(IUsuarioService userService)
        {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Usuário ou senha incorretos." });

            return Ok(response);
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }
    }
}
