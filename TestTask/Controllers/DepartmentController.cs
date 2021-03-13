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
    [Route("api/department")]
    public class DepartmentController : ControllerBase
    {
        private readonly AppDbContext _ctx;

        public DepartmentController(AppDbContext context)
        {
            _ctx = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Department>>> Get()
        {
            List<Department> departments = new List<Department> {};

            foreach (var val in _ctx.Departments)
            {
                var depVal =await Get(val.Id);
                departments.Add(depVal);
            }

            return departments;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> Get(int id)
        {

            var department = await _ctx.Departments.FirstOrDefaultAsync(x => x.Id == id);
            if (department == null)
            {
                return NotFound();
            }
            else
            {
            var employees = _ctx.Employees.Where(x => x.DepartmentId == id);
            decimal emplSal=0;
            if (employees.Any())
            {
                foreach (var val in employees)
                {
                    emplSal += val.Salary;
                }

                emplSal /= employees.Count();
            }
            
            department.AverageSalary = emplSal;
            
            return department;
            }

        }
    }
}
