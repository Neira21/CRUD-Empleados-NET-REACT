using EmpleadosAPI.Data;
using EmpleadosAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmpleadosAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
        private readonly DataContext _context;
        public EmpleadoController(DataContext c)
        {
            _context = c;
        }

        [HttpGet]
        [Route("List")]
        public async Task<IActionResult> GetEmpleados()
        {
            var lista = await _context.Empleados.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpGet]
        [Route("Detail/{id:int}")]
        public async Task<IActionResult> GetEmpleado(int id)
        {
            var empleado = await _context.Empleados.FirstOrDefaultAsync(e => e.Id == id);
            return StatusCode(StatusCodes.Status200OK, empleado);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> AddEmpleados([FromBody] Empleado empleado)
        {
            if(empleado == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "No se ha enviado un empleado");
            }
            if (!ModelState.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "El empleado no cumple con los requisitos");
            }
            await _context.Empleados.AddAsync(empleado);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, new {message = "ok"});
        }

        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> EditEmpleados(Empleado empleado)
        {
            if (empleado == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "No se ha enviado un empleado");
            }
            _context.Empleados.Update(empleado);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, new { message = "Empleado editado", empleado = empleado });
        }


        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> DeleteEmpleado(int id)
        {
            var empleado = await _context.Empleados.FirstOrDefaultAsync(e => e.Id == id);
            if(empleado == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, "No se ha encontrado el empleado");
            }
            _context.Empleados.Remove(empleado);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Empleado Eliminado con éxito");
        }

    }
}
