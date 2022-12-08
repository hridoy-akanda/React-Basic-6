import React from "react";
import { Form, Button } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Filter = () => {
  const {
    productState: { sort, byStock, byFastDelivery, byRating },
    productDispatch,
  } = CartState();
  // console.log(sort, byStock, byFastDelivery, byRating);

  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          type="radio"
          label="Ascending"
          name="group1"
          onChange={() => {
            productDispatch({ type: "SORT_BY_PRICE", payload: "lowToHigh" });
          }}
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          type="radio"
          label="Descending"
          name="group1"
          onChange={() => {
            productDispatch({ type: "SORT_BY_PRICE", payload: "highToLow" });
          }}
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          type="checkbox"
          label="Include Out of Stock"
          name="group1"
          onChange={() => {
            productDispatch({ type: "FILTER_BY_STOCK" });
          }}
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          type="checkbox"
          label="Fast Delivery Only"
          name="group1"
          onChange={() => {
            productDispatch({ type: "FILTER_BY_FASTDELIVERY" });
          }}
          checked={byFastDelivery}
        />
      </span>
      <span>
        <label>Rating: </label>{" "}
        <Rating
          rating={byRating}
          onClick={(i) =>
            productDispatch({ type: "FILTER_BY_RATING", payload: i + 1 })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button
        variant="light"
        onClick={() => {
          productDispatch({ type: "CLEAR_FILTERS" });
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filter;
