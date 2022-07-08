using Representantes.WebApi.Data;

namespace Representantes.WebApi.Models
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Matricula { get; set; }
        public int Perfil { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(Usuario user, string token)
        {
            Id = user.Id;
            Nome = user.Nome;
            Matricula = user.Matricula;
            Perfil = user.Perfil;
            Token = token;
        }
    }
}
