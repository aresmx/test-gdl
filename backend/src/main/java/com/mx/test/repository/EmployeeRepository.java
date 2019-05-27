package com.mx.test.repository;

import com.mx.test.data.Employee;
import com.mx.test.data.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    @Query(value = "SELECT e FROM Employee e WHERE e.id = :id AND e.status = :status")
    Employee findOneByIdAndStatus(@Param(value = "id") Integer id, @Param(value = "status") Status status);

    List<Employee> findAllByStatus(Status status);
}
