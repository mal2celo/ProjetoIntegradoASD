using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Representantes.Data;
using Representantes.WebApi.Commons;
using Representantes.WebApi.Data;
using Representantes.WebApi.Helpers;
using Representantes.WebApi.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Representantes.WebApi.Services
{
    public interface IUsuarioService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        IEnumerable<Usuario> GetAll();
        Usuario GetById(int id);
    }

    public class UsuarioService : IUsuarioService
    {
        private readonly AppSettings _appSettings;

        private readonly AppDbContext _context;

        public UsuarioService(IOptions<AppSettings> appSettings, AppDbContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _context.Usuarios
                    .Where(b => b.Matricula == model.Matricula && b.Senha == Utils.CreateSHA512(model.Senha))
                    .FirstOrDefault();

            if (user == null) return null;

            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public IEnumerable<Usuario> GetAll()
        {
            return _context.Usuarios;
        }

        public Usuario GetById(int id)
        {
            return _context.Usuarios.Find(id);                    
        }

        private string generateJwtToken(Usuario user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            var claims = new List<Claim>();
            claims.Add(new Claim("id", user.Id.ToString()));
            claims.Add(new Claim("nome", user.Nome));
            claims.Add(new Claim("matricula", user.Matricula.ToString()));
            claims.Add(new Claim("peril", user.Perfil.ToString()));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
