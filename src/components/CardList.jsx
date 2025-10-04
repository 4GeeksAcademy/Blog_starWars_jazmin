import React from "react";
import CardItem from "./CardItem.jsx";

export default function CardList({ title, items }) {
  return (
    <section className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">{title}</h3>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {items.map(item => (
          <CardItem key={`${item.type}-${item.uid}`} item={item} />
        ))}
      </div>
    </section>
  );
}
