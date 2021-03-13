using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestTask.Data;
using TestTask.Models;

namespace TestTask.Controllers
{
    [ApiController]
    [Route("api/employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _ctx;

        public EmployeeController(AppDbContext context)
        {
            _ctx = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> Get()
        {
            return await _ctx.Employees.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> Get(int id)
        {
            var employee = await _ctx.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if (employee == null) { return NotFound(); }
            return employee;
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(Employee employee)
        {
                _ctx.Add(employee);
                await _ctx.SaveChangesAsync();
                return employee.Id;
        }

        [HttpPut]
        public async Task<ActionResult> Put(Employee employee)
        {
            _ctx.Attach(employee).State = EntityState.Modified;
            await _ctx.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var employee = await _ctx.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if (employee == null)
            {
                return NotFound();
            }

            _ctx.Remove(employee);
            await _ctx.SaveChangesAsync();
            return NoContent();
        }
    }
}
