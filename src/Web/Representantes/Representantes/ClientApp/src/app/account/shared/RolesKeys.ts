export class RolesKeys{
  //Permissão do usuario administrador srg com privilegios de super usuário.
  //Equivalente ao IndUsuarioAssociadoJerseyBrasil do antigo srg
  public static readonly SuperAdmin: string = "SUPER_ADMIN";

  //Permissão do usuario administrador srg.
  public static readonly Admin: string = "GR_SRG_JERSEY_ADMIN";

  /// Permissão do usuario associado (criador).
  public static readonly Associado = "GR_SRG_ASSOCIADO";

  /// Permissão do usuario procurador.
  public static readonly Procurador = "GR_SRG_PROCURADOR";

  /// Permissão do usuario inspetor.
  public static readonly Inspetor = "GR_SRG_INSPETOR";

  /// Permissão do usuario veterinário.
  public static readonly Veterinario = "GR_SRG_VETERINARIO";

  /// Permissão do usuario superintendente.
  public static readonly Superintendente = "GR_SRG_SUPERINTENDENTE";
  
  /// Permissão para consulta do Plantel.
  public static readonly Plantel = "Plantel";
  
  /// Permissão para details do Plantel.
  public static readonly PlantelDetails = "Plantel_Details";
  
  /// Permissão para details do Plantel.
  public static readonly PlantelEdit = "Plantel_Edit";
  
  /// Permissão para visualizar o Menu de Certificados.
  public static readonly Certificado = "Certificado";
  
  /// Permissão para consultar Certificados.
  public static readonly CertificadoConsultar = "Certificado_Consultar";

  /// Permissão para assinar o Certificado.
  public static readonly CertificadoAssinar = "Certificado_Assinar";

  /// Permissão para cadastro de Criador.
  public static readonly Criador = "Criador";
  
  /// Permissão para cadastro de Usuario.
  public static readonly Usuario = "Usuario";
  
  /// Permissão para cadastro de Exposicao.
  public static readonly Exposicao = "Exposicao";

  /// Permissão para consulta de Padreacao.
  public static readonly Padreacao = "Padreacao";

  /// Permissão para registrar Padreacao.
  public static readonly PadreacaoRegistrar = "Padreacao_Create";

  /// Permissão para consulta de Nascimento.
  public static readonly Nascimento = "Nascimento";

  /// Permissão para registrar Nascimento.
  public static readonly NascimentoRegistrar = "Nascimento_Create";

  /// Permissão para consulta de Fiv.
  public static readonly Fiv = "Fiv";

  /// Permissão para registrar Fiv.
  public static readonly FivRegistrar = "Fiv_Create";

  /// Permissão para consulta de Inovulacao.
  public static readonly Inovulacao = "Inovulacao";

  /// Permissão para registrar Inovulacao.
  public static readonly InovulacaoRegistrar = "Inovulacao_Create";
  
  /// Permissão para consulta de Baixa.
  public static readonly Baixa = "Baixa";

  /// Permissão para registrar Baixa.
  public static readonly BaixaRegistrar = "Baixa_Create";

  /// Permissão para consulta de Transferencia.
  public static readonly Transferencia = "Transferencia";

  /// Permissão para registrar Transferencia.
  public static readonly TransferenciaRegistrar = "Transferencia_Create";

  /// Permissão para consulta de Inspecao.
  public static readonly Inspecao = "Inspecao";

  /// Permissão para registrar Inspecao.
  public static readonly InspecaoRegistrar = "Inspecao_Create";  

  /// Permissão para consulta de ClassificacaoLinear.
  public static readonly ClassificacaoLinear = "ClassificacaoLinear";

  /// Permissão para registrar ClassificacaoLinear.
  public static readonly ClassificacaoLinearRegistrar = "ClassificacaoLinear_Create";  
  
  /// Permissão para consulta de Nacionalizacao.
  public static readonly Nacionalizacao = "Nacionalizacao";

  /// Permissão para registrar Nacionalizacao.
  public static readonly NacionalizacaoRegistrar = "Nacionalizacao_Create";  
  
  /// Permissão para registrar NacionalizacaoEmbriao.
  public static readonly NacionalizacaoEmbriaoRegistrar = "NacionalizacaoEmbriao_Create";  
  
}