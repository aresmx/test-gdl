package com.mx.test.service;

import com.mx.test.data.Employee;
import com.mx.test.data.Status;
import com.mx.test.repository.EmployeeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository repository;

    @Override
    public Employee findById(Integer id) {
        log.info("Searching Employee with id {} and Status: Active", id);
        return this.repository.findOneByIdAndStatus(id, Status.ACTIVE);
    }

    @Override
    public Employee create(Employee employee) {
        employee.setStatus(Status.ACTIVE);
        employee.setDateOfEmployment(new Date());
        log.info("Creating new Employee {}", employee);
        log.info("By Default all the employees will be ACTIVE");
        return this.repository.save(employee);
    }

    @Override
    public void update(Employee employee) {
        log.info("Updating Employee, new values {}", employee);
        this.repository.save(employee);
        log.info("Employee updated successfully");
    }

    @Override
    public boolean delete(Integer id) {
        log.info("Deleting Employee with ID {}", id);
        /**
         * USING Optional<T>
         * */
        Optional<Employee> employee = this.repository.findById(id);
        if (employee.isPresent()) {
            log.info("Set the status to INACTIVE");
            Employee employeeToUpdate = employee.get();
            employeeToUpdate.setStatus(Status.INACTIVE);
            this.update(employeeToUpdate);
        }
        return employee.isPresent();
    }

    @Override
    public List<Employee> getAll() {
        log.info("Searching all employees by Status Active");
        List<Employee> employees = this.repository.findAllByStatus(Status.ACTIVE);
        /**
         * USING forEach and Lambda exp - JAVA 8
         * */
        employees.forEach(employee -> log.info("Employee found {}", employee));
        return employees;
    }
}
