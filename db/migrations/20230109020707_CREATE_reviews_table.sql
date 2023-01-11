-- migrate:up
CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    content VARCHAR(300) NULL,
    photo VARCHAR(1000) NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    order_product_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (order_product_id) REFERENCES order_products(id)
)

-- migrate:down
DROP TABLE reviews;
