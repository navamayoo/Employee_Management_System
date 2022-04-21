using EmployeeManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Repository
{
    public interface IDepartmentRepository
    {
        IEnumerable<Department> GetAllDepartments();
        Department GetDepartmentById(int id);
        Department CreateDepartment(Department department);
        Department UpdateDepartment(Department department);
        void DeleteDepartment(int id);



    }
}
