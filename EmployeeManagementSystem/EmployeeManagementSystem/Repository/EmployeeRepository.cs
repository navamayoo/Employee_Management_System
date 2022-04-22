using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        public IConfiguration Configuration { get; set; }
        public string connectionString;
        SqlCommand command;

        public EmployeeRepository(IConfiguration _configuration)
        {
            Configuration = _configuration;
            connectionString = Configuration["ConnectionStrings:DevConnection"];
        }

        public IEnumerable<Employee> GetAllEmployees()
        {
            List<Employee> employees = new List<Employee>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    string sql = "select * from Employees";
                    command = new SqlCommand(sql, connection);
                    connection.Open();
                    SqlDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        Employee  employee = new Employee();
                        employee.employeeId = Convert.ToInt32(dataReader["employeeId"]);
                        employee.firstName = dataReader["firstName"].ToString();
                        employee.lastName = dataReader["lastName"].ToString();
                        employee.email = dataReader["email"].ToString();
                        employee.dateOfBirth = Convert.ToDateTime(dataReader["dateOfBirth"].ToString());
                        employee.age = Convert.ToInt32(dataReader["age"]);
                        employee.salary = Convert.ToDecimal(dataReader["salary"]);
                        employee.departmentId = Convert.ToInt32(dataReader["departmentId"]);
                        employees.Add(employee);
                    }
                    dataReader.Close();

                }
                catch (Exception)
                {
                    throw;

                    employees = null;
                }
                return employees;
            }
        }

        public Employee GetEmployeeById(int id)
        {
            Employee employee = new Employee();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    string sql = "select * from Employees where  EmployeeId= '" + id + "' ";
                    command = new SqlCommand(sql, connection);
                    connection.Open();
                    SqlDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        employee.employeeId = id;
                        employee.firstName = dataReader["firstName"].ToString();
                        employee.lastName = dataReader["lastName"].ToString();
                        employee.email = dataReader["email"].ToString();
                        employee.dateOfBirth = Convert.ToDateTime(dataReader["dateOfBirth"].ToString());
                        employee.age = Convert.ToInt32(dataReader["age"]);
                        employee.salary = Convert.ToDecimal(dataReader["salary"]);
                        employee.departmentId = Convert.ToInt32(dataReader["departmentId"]);
                       
                    }
                    dataReader.Close();

                }
                catch (Exception)
                {
                    throw;
                    employee = null;
                }
                return employee;
            }
        }

        public Employee CreateEmployee(Employee employee)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    command = new SqlCommand();
                    command.CommandText = "[dbo].[SP_CreateEmployee]";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Connection = connection;
                    command.Parameters.AddWithValue("@firstName", employee.firstName.Trim());
                    command.Parameters.AddWithValue("@lastName", employee.lastName.Trim());
                    command.Parameters.AddWithValue("@email", employee.email.Trim());
                    command.Parameters.AddWithValue("@dateOfBirth", employee.dateOfBirth);
                    command.Parameters.AddWithValue("@age", employee.age);
                    command.Parameters.AddWithValue("@salary", employee.salary);
                    command.Parameters.AddWithValue("@departmentId", employee.departmentId);
                    command.ExecuteNonQuery();
                    command.Dispose();
                    connection.Dispose();


                }
                catch (Exception)
                {
                    throw;
                    employee = null;
                }
                return employee;
            }
        }

        public Employee UpdateEmployee(Employee employee)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    command = new SqlCommand();
                    command.CommandText = "[dbo].[SP_UpdateEmployee]";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Connection = connection;
                    command.Parameters.AddWithValue("@employeeId", employee.employeeId);
                    command.Parameters.AddWithValue("@firstName", employee.firstName.Trim());
                    command.Parameters.AddWithValue("@lastName", employee.lastName.Trim());
                    command.Parameters.AddWithValue("@email", employee.email.Trim());
                    command.Parameters.AddWithValue("@dateOfBirth", employee.dateOfBirth);
                    command.Parameters.AddWithValue("@age", employee.age);
                    command.Parameters.AddWithValue("@salary", employee.salary);
                    command.Parameters.AddWithValue("@departmentId", employee.departmentId);
                    command.ExecuteNonQuery();
                    command.Dispose();
                    connection.Dispose();

                }
                catch (Exception)
                {
                    throw;
                    employee = null;
                }
                return employee;
            }
        }

        public void DeleteEmployee(int id)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    command = new SqlCommand();
                    command.CommandText = "[dbo].[SP_DeleteEmployee]";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Connection = connection;
                    command.Parameters.AddWithValue("@employeeId", id);
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
