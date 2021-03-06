using EmployeeManagementSystem.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Repository
{
    public class DepartmentRepository : IDepartmentRepository
    {
        public IConfiguration Configuration  { get; set; }
        public string connectionString;
        SqlCommand command;



        public DepartmentRepository(IConfiguration _configuration)
        {
            Configuration = _configuration;
            connectionString = Configuration["ConnectionStrings:DevConnection"];
        }

        public IEnumerable<Department> GetAllDepartments()
        {
            List<Department> departments = new List<Department>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    string sql = "select * from Departments";
                    command = new SqlCommand(sql, connection);
                    connection.Open();
                    SqlDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        Department department = new Department();
                        department.departmentId = Convert.ToInt32(dataReader["departmentId"]);
                        department.departmentName = dataReader["departmentName"].ToString();
                        departments.Add(department);

                    }
                    dataReader.Close();
                        
                }
                catch (Exception)
                {
                    throw;
                    departments = null;
                }
                return departments;
            }
        }

        public Department GetDepartmentById(int id)
        {
            Department department = new Department();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    string sql = "select * from Departments where DepartmentId = '" + id + "' ";
                    command = new SqlCommand(sql, connection);
                    connection.Open();
                    SqlDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        department.departmentId = id;
                        department.departmentName = dataReader["departmentName"].ToString();
                    }
                    dataReader.Close();

                }
                catch (Exception)
                {
                    throw;
                    department = null;
                }
                return department ;
            }
        }
        public Department CreateDepartment(Department department)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    command = new SqlCommand();
                    command.CommandText = "SP_CreateDepartment";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Connection = connection;
                    command.Parameters.AddWithValue("@departmentName", department.departmentName.Trim());
                    command.ExecuteNonQuery();
                    command.Dispose();
                    connection.Dispose();


                }
                catch (Exception)
                {
                    throw;
                    department = null;
                }
                return department;
            }
        }




        public Department UpdateDepartment(Department department)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    command = new SqlCommand();
                    command.CommandText = "SP_UpdateDepartment";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Connection = connection;
                    command.Parameters.AddWithValue("@departmentId", department.departmentId);
                    command.Parameters.AddWithValue("@departmentName", department.departmentName.Trim());
                    command.ExecuteNonQuery();
                    command.Dispose();
                    connection.Dispose();


                }
                catch (Exception)
                {
                    throw;
                    department = null;
                }
                return department;
            }
        }
        public void DeleteDepartment(int id)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    command = new SqlCommand();
                    command.CommandText = "SP_DeleteDepartment";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Connection = connection;
                    command.Parameters.AddWithValue("@departmentId", id);
                    command.ExecuteNonQuery();
                    command.Dispose();
                    connection.Dispose();


                }
                catch (Exception)
                {
                    throw;
                }
               
            }
        }

    }
}
