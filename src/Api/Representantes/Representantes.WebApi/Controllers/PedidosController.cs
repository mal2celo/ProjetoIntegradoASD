using Microsoft.AspNetCore.Mvc;
using Representantes.WebApi.Helpers;
using Representantes.WebApi.Models;
using Representantes.WebApi.Services;

namespace Representantes.WebApi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PedidosController : ControllerBase
    {
        private readonly IPedidoService _pedidoService;

        public PedidosController(IPedidoService pedidoService)
        {
            _pedidoService = pedidoService;
        }

        [Authorize]
        [HttpPost("consultar_pedidos")]
        public IActionResult PostConsultarPedidos()
        {
            var response = _pedidoService.ConsultarPedidos();

            if (response == null)
                return BadRequest(new { message = "Não foi possível consultar os pedidos." });

            return Ok(response);
        }

        [Authorize]
        [HttpPost("consultar_pedido")]
        public IActionResult PostConsultarPedido(PedidoRequest request)
        {
            var response = _pedidoService.ConsultarPedido(request.Id);

            if (response == null)
                return BadRequest(new { message = "Não foi possível consultar o pedido " + request.Id });

            return Ok(response);
        }

        [Authorize]
        [HttpPost("aprovar_pedido")]
        public IActionResult PostAprovarPedido(PedidoRequest request)
        {
            var response = _pedidoService.AprovarPedido(request.Id);

            if (response == 0)
                return BadRequest(new { message = "Não foi possível aprovar o pedido." + request.Id });

            return Ok(new { message = "Pedido aprovado com sucesso!" + request.Id });
        }

        [Authorize]
        [HttpPost("reprovar_pedido")]
        public IActionResult PostReprovarPedido(PedidoRequest request)
        {
            var response = _pedidoService.ReprovarPedido(request.Id);

            if (response == 0)
                return BadRequest(new { message = "Não foi possível aprovar o pedido." + request.Id });

            return Ok(new { message = "Pedido reprovado com sucesso!" + request.Id });
        }

    }
}
