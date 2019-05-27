package com.mx.test.service;

import com.mx.test.data.Employee;

import java.util.List;

/**
 * FACADE PATTERN - GREAT WAY TO HIDE THE BUSINESS
 */
public interface EmployeeService {
    Employee findById(Integer id);

    Employee create(Employee employee);

    void update(Employee employee);

    boolean delete(Integer id);

    List<Employee> getAll();
}
