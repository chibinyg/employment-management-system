package com.uco.ems.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.uco.ems.dto.EmployeeDto;
import com.uco.ems.entity.Department;
import com.uco.ems.entity.Employee;
import com.uco.ems.exception.ResourceNotFoundException;
import com.uco.ems.mapper.EmployeeMapper;
import com.uco.ems.repository.DepartmentRepository;
import com.uco.ems.repository.EmployeeRepository;
import com.uco.ems.service.EmployeeService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    private DepartmentRepository departmentRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);

        // For many to one
        Department department = departmentRepository.findById(employeeDto.getDepartmentId())
        .orElseThrow(() -> new ResourceNotFoundException("Department does not exist with id: " + employeeDto.getDepartmentId()));
        employee.setDepartment(department); 

        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeebyId(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Employee does not exist with given id: " + employeeId));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(long employeeId, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee does not exist with given id:" + employeeId));

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        // For many to one
        Department department = departmentRepository.findById(updatedEmployee.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Department does not exist with id: " + updatedEmployee.getDepartmentId()));
        employee.setDepartment(department);

        Employee updateEmployeeObj = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updateEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee does not exist with given id:" + employeeId));
        employeeRepository.deleteById(employeeId);
    }

}
