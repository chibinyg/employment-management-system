package com.uco.ems.mapper;

import com.uco.ems.dto.DepartmentDto;
import com.uco.ems.entity.Department;

public class DepartmentMapper {
    
    // Convert department jpa entity to department dto
    public static DepartmentDto mapToDepartmentDto(Department department) {
        return new DepartmentDto(
            department.getId(),
            department.getDepartmentName(),
            department.getDepartmentDescription()
        );
    }

    // Convert department dto to department jpa entity
    public static Department mapToDepartment(DepartmentDto departmentDto) {
        return new Department(
            departmentDto.getId(),
            departmentDto.getDepartmentName(),
            departmentDto.getDepartmentDescription()
        );
    }
}
