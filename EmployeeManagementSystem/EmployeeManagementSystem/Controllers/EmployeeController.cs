using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using EmployeeManagementSystem.Repository;
using EmployeeManagementSystem.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeRepository employeeRepository;
        public EmployeeController(IEmployeeRepository repository)
        {
            employeeRepository = repository;
        }

        // GET: api/<EmployeeController>
        [HttpGet]
        public IEnumerable<Employee> GetEmployee()
        {
            return employeeRepository.GetAllEmployees().ToList();
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public Employee GetEmployeeById(int id)
        {
            return employeeRepository.GetEmployeeById(id);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public Employee Create([FromBody] Employee employee)
        {
            return employeeRepository.CreateEmployee(employee);
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public Employee Update(int id, [FromBody] Employee employee)
        {
            return employeeRepository.UpdateEmployee(employee);
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            employeeRepository.DeleteEmployee(id);
        }
    }
}
