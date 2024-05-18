using System.ComponentModel.DataAnnotations;

namespace EmpleadosAPI.Models
{
    public class Empleado
    {
        public int Id { get; set; }
        [Required]
        public string? Nombre { get; set; }
        [Required]
        public string? Correo{ get; set; }
        [Required]
        public int? Sueldo { get; set; }


    }
}
