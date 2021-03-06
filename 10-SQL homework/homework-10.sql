use sakila;

--  First and last names of actors from table actor
SELECT last_name, first_name
FROM actor;


--  Display first and last actor in single column in upper case letters, Actor Name
SELECT CONCAT_WS(' ', first_name, last_name) AS Actor_Name
FROM actor;

--  2a Find ID number, first name and last name of actor name Joe
SELECT actor_id, first_name, last_name 
FROM actor 
WHERE first_name LIKE "Joe";

--  2b Find actors whose last name contain the letters GEN
SELECT first_name, last_name 
FROM actor 
WHERE last_name LIKE '%GEN%';

--  2c Find all actors whose last names contain the letters lI, last name first name
SELECT last_name, first_name 
FROM actor 
WHERE last_name LIKE '%LI%';

--  2d using IN, display the country_id and country columns 
SELECT country_id, country.country 
FROM country 
WHERE country.country IN ('Afghanistan', 'Bangladesh', 'China');

--  3a. Description of each actor. so create a column in the table actor named description and use the data type BLOB   
ALTER TABLE `sakila`.`actor` 
ADD COLUMN `description` BLOB(200) NULL AFTER `last_name`;

-- 3b. Very quickly you realize that entering descriptions for each actor is too much effort. Delete the description column
ALTER TABLE `sakila`.`actor` 
DROP COLUMN `description`;

-- 4a. List the last names of actors, as well as how many actors have that last name.

SELECT last_name, COUNT(*) AS count_lastname FROM actor GROUP BY last_name;

-- 4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors
SELECT last_name, COUNT(*) AS count_lastname
FROM actor 
GROUP BY last_name
HAVING COUNT(*) >= 2;

-- 4c. The actor HARPO WILLIAMS was accidentally entered in the actor table as GROUCHO WILLIAMS. Write a query to fix the record.
UPDATE actor
SET first_name = 'HARPO'
WHERE first_name = 'GROUCHO' AND last_name = 'WILLIAMS';

-- 4d. Perhaps we were too hasty in changing GROUCHO to HARPO. It turns out that GROUCHO was the correct name after all! In a single query, if the first name of the actor is currently HARPO, change it to GROUCHO.
UPDATE actor SET first_name = 'GROUCHO' WHERE first_name = 'HARPO';


-- 5a. You cannot locate the schema of the address table. Which query would you use to re-create it?
SHOW CREATE TABLE address;

-- 6a. Use JOIN to display the first and last names, as well as the address, of each staff member. Use the tables staff and address:
SELECT first_name, last_name, address, district, city_id  
FROM staff
JOIN address using (address_id);

--  6b. Use JOIN to display the total amount rung up by each staff member in August of 2005. Use tables staff and payment.
SELECT staff.first_name, staff.last_name, concat('$', format(sum(payment.amount), 2)) as Total_amount FROM payment
JOIN staff ON staff.staff_id = payment.staff_id
WHERE
  payment.payment_date >= "2005-08-01" AND
  payment.payment_date <= "2005-08-31"
group by staff.staff_id;

--  6c. List each film and the number of actors who are listed for that film. Use tables film_actor and film. 
--  Use inner join.
SELECT film.film_id, film.title, count(film_actor.actor_id) AS Total_Actors FROM film_actor
INNER JOIN film ON film.film_id = film_actor.film_id
GROUP BY film.title;

--  6d. How many copies of the film Hunchback Impossible exist in the inventory system?
SELECT title, (SELECT COUNT(*) FROM inventory WHERE film.film_id = inventory.film_id) AS 'Number of Copies'
FROM film
WHERE film.title = 'Hunchback Impossible';

--  6e. Using the tables payment and customer and the JOIN command, 
--  list the total paid by each customer. List the customers alphabetically by last name:
SELECT customer.customer_id, customer.first_name, customer.last_name, concat('$', format(sum(payment.amount), 2)) AS 'Total Payment'
FROM payment
INNER JOIN customer ON payment.customer_id = customer.customer_id
GROUP BY last_name;

--  7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence, films starting with the letters K and Q have also soared in popularity. 
--  Use subqueries to display the titles of movies starting with the letters K and Q whose language is English.
SELECT title
FROM film
WHERE title in
(
	SELECT title
    FROM film
    WHERE title LIKE 'K%' OR title LIKE 'Q%'	
);


--  7b. Use subqueries to display all actors who appear in the film Alone Trip.
SELECT first_name, last_name
FROM actor
WHERE actor_id IN
(
  SELECT actor_id 
  FROM film_actor
  WHERE film_id IN
(
     SELECT film_id
     FROM film
     WHERE title = 'Alone Trip'
    )
);

--  7c. You want to run an email marketing campaign in Canada, for which you will need the names and email addresses of all Canadian customers. 
--  Use joins to retrieve this information.

SELECT CONCAT(customer.first_name,' ', customer.last_name) AS 'Name', customer.email 
FROM customer
WHERE customer.address_id IN
	(	
	SELECT address_id
	FROM address
	WHERE city_id IN
		(
        SELECT city_id 
        FROM city
        WHERE country_id IN
			(
            SELECT country_id 
            FROM country
            WHERE country_id = 20
            )
		)
);
-- answere #2 without subqueries
SELECT 
customer.first_name,
customer.last_name,
customer.email,
country.country
FROM
customer,
country, 
address,
city
WHERE customer.address_id = address.address_id 
AND address.city_id = city.city_id
AND city.country_id = country.country_id
AND country.country_id = 20;


--  7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. 
--  Identify all movies categorized as family films.
SELECT film.title
FROM film
WHERE film_id IN
(
  SELECT film_id 
  FROM film_category
  WHERE category_id IN
(
     SELECT category_id	
     FROM category
     WHERE name = 'Family'
    )
);

--  7e. Display the most frequently rented movies in descending order.
SELECT film.title, COUNT(payment.payment_id) AS total_rentals
FROM film
INNER JOIN inventory ON inventory.film_id = film.film_id
LEFT JOIN rental ON inventory.inventory_id = rental.inventory_id
LEFT JOIN payment ON rental.rental_id = payment.rental_id
GROUP BY film.title
ORDER BY total_rentals DESC;
         
	
--  7f. Write a query to display how much business, in dollars, each store brought in.
SELECT store_id, (SELECT concat('$', format(SUM(amount), 2)) FROM payment WHERE store.store_id = payment.staff_id) AS 'Total_Amount' 
FROM store;

--  7g. Write a query to display for each store its store ID, city, and country.
SELECT store.store_id, address.address, city.city, country.country
FROM (((store
LEFT JOIN address ON store.address_id = address.address_id)
LEFT JOIN city ON address.city_id = city.city_id)
Left JOIN country ON city.country_id = country.country_id);
       

--  7h. List the top five genres in gross revenue in descending order. (Hint: you may need to use the following tables: category, film_category, inventory, payment, and rental.)
SELECT category.category_id, name, concat('$', format(SUM(payment.amount), 2)) AS Total_gross
FROM ((((category
LEFT JOIN film_category ON category.category_id = film_category.category_id)
LEFT JOIN inventory ON film_category.film_id = inventory.film_id)
LEFT JOIN rental ON inventory.inventory_id = rental.inventory_id)
LEFT JOIN payment ON rental.rental_id = payment.rental_id)
GROUP BY category.name
ORDER BY total_gross DESC LIMIT 5;

--  8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. 
--  Use the solution from the problem above to create a view. If you haven't solved 7h, 
--  you can substitute another query to create a view.
CREATE VIEW `Top_View` AS 
SELECT category.category_id, name, SUM(payment.amount) AS total_gross
FROM ((((category
LEFT JOIN film_category ON category.category_id = film_category.category_id)
LEFT JOIN inventory ON film_category.film_id = inventory.film_id)
LEFT JOIN rental ON inventory.inventory_id = rental.inventory_id)
LEFT JOIN payment ON rental.rental_id = payment.rental_id)
GROUP BY category.name
ORDER BY total_gross DESC LIMIT 5;

--  8b. How would you display the view that you created in 8a?
SELECT * FROM top_view;
--  8c. You find that you no longer need the view top_five_genres. Write a query to delete it.
DROP VIEW `top_view`;
