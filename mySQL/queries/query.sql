select * from co.employees;
-- Employees name with their manager except CEO -------------------------------------------------------------------------------------

SELECT e.name AS employee, m.name AS manager
FROM co.employees e
INNER JOIN co.employees m ON m.id = e.manager_id;

-- Employees name with their manager's id include CEO ------------------------------------------------------------------------------------

SELECT e.id,e.name, 
case when e.manager_id > 0 then e.manager_id else 'null' end as manager
FROM co.employees e
JOIN co.employees m group by e.name order by e.id;

-- Employees name with their manager's name include CEO -ok-------------------------------------------------------------

SELECT e.id,e.name,
case when e.manager_id > 0 then m.name else 'null' end as manager
FROM co.employees e
JOIN co.employees m on e.manager_id = m.id or e.manager_id is null group by e.name order by e.id;

-- Employees which has no employee -----------------------------------------------------------------------------------

select id, e.name from co.employees as e where e.id NOT IN (select m.manager_id from co.employees as m where m.manager_id is not null); 

-- Count of Employees for each employee --------------------------------------------------------------------------

SELECT e.id, e.name,e.position, count(*) as employee_count FROM co.employees as e join co.employees as m on e.id = m.manager_id  group by e.id,e.name ;
