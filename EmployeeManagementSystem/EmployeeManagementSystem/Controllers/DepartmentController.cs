using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using EmployeeManagementSystem.Repository;
using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private IDepartmentRepository departmentRepository;
        public DepartmentController(IDepartmentRepository repository)
        {
            departmentRepository = repository;
        }
        // GET: api/<DepartmentController>
        [HttpGet]
        public IEnumerable<Department> GetDepartment()
        {
            return departmentRepository.GetAllDepartments().ToList();
        }

        // GET api/<DepartmentController>/5
        [HttpGet("{id}")]
        public Department GetDepartmentById(int id)
        {
            return departmentRepository.GetDepartmentById(id);
        }

        // POST api/<DepartmentController>
        [HttpPost]
        public Department Create ([FromBody] Department department)
        {
            return departmentRepository.CreateDepartment(department);
        }

        // PUT api/<DepartmentController>/5
        [HttpPut("{id}")]
        public Department Update (int id, [FromBody] Department department)
        {
            return departmentRepository.UpdateDepartment(department);
        }

        // DELETE api/<DepartmentController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
             departmentRepository.DeleteDepartment(id);
        }
    }
}
