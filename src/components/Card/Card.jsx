import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";

const Card = ({
  call: {
    id,
    created_at,
    direction,
    from,
    to,
    via,
    duration,
    is_archived,
    call_type,
  },
  time,
}) => {
  return (
    <div className="card">
      <Link to={`/activities/${id}`}>
        <button>
          {call_type === "missed" ? (
            <i className="fas fa-phone-slash"></i>
          ) : (
            <i className="fas fa-phone"></i>
          )}
          <div>
            <div>{from}</div>
            <div>tried to call on {to ? to : via}</div>
          </div>
          <div>{time && time}</div>
        </button>
      </Link>
    </div>
  );
};

export default Card;
