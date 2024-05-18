using EmpleadosAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmpleadosAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<Empleado> Empleados { get; set; }
    }
}
