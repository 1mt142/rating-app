import React, { useEffect, useState } from "react";
import { Icon, stylesFactory } from "@grafana/ui";
import { css } from "@emotion/react";

function ProductTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data?.products))
      .catch((error) => console.error("Error:", error));
  }, []);

  const getRatingStars = (rating) => {
    const numStars = 5;
    const ratingStars = [];

    for (let i = 0; i < numStars; i++) {
      const starFillColor = i < rating ? "gold" : "gray";

      ratingStars.push(
        <Icon
          name="star"
          key={i}
          style={{ color: starFillColor }}
          className={css`
            font-size: 20px; // Adjust the size as needed
          `}
        />
      );
    }

    return (
      <span
        className={css`
          display: flex;
        `}
      >
        {ratingStars}
      </span>
    );
  };

  const styles = stylesFactory(() => {
    return {
      rating: css`
        display: flex;
        align-items: center;
      `,
    };
  });

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td className={styles.rating}>
                {getRatingStars(product.rating)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
