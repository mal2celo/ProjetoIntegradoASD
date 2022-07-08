using System.ComponentModel.DataAnnotations;

namespace Representantes.WebApi.Models
{
    public class AuthenticateRequest
    {
        [Required]
        public int Matricula { get; set; }

        [Required]
        public string Senha { get; set; }
    }
}
