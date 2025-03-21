package com.uco.ems.service;

import java.util.List;

import com.uco.ems.dto.EmployeeDto;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeebyId(Long employeeId);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(long employeeId, EmployeeDto updatedEmployee);

    void deleteEmployee(Long employeeId);
}
