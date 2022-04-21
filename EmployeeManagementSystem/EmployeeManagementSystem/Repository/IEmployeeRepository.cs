using EmployeeManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Repository
{
    public interface IEmployeeRepository
    {
        IEnumerable<Employee> GetAllEmployees();
        Employee GetEmployeeById(int id);
        Employee CreateEmployee(Employee employee);
        Employee UpdateEmployee(Employee employee);
        void DeleteEmployee(int id);
    }
}
