import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../API/axios-instance";
import { getTime } from "../../shared/common";
import "./ActivityDetails.scss";

const ActivityDetails = (props) => {
  const { id } = useParams();
  const [details, setDetails] = useState();
  const [time, setTime] = useState();

  const handleArchive = () => {
    return () => {
      const isArchived = details.is_archived ? false : true;
      axios
        .post(`/activities/${id}`, { is_archived: isArchived })
        .then((res) => setDetails(res.data))
        .catch((err) => console.error(err));
    };
  };

  const getDetails = (url) => {
    axios
      .get(url)
      .then((res) => {
        setDetails(res.data);
        setTime(getTime(res.data.created_at));

      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getDetails(`/activities/${id}`);
  }, [id]);

  if (!details) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="activityDetails">
      <i className="far fa-user-circle profile"></i>
      <button onClick={handleArchive()} className="archiveButton">
        {!details.is_archived ? "Archive Call" : "UnarchiveCall"}
      </button>
      <div className="typeContainer">
        <div className="type">
          {details.call_type === "missed" ? (
            <i className="fas fa-phone-slash"></i>
          ) : (
            <i className="fas fa-phone"></i>
          )}
        </div>
        <div>{details.from}</div>
      </div>
      <div className="activityContainer">Duration: {details.duration} min.</div>
      <div className="activityContainer">Date: {details.created_at.split('T')[0]}</div>
      <div className="activityContainer">Time: {time}</div>
      <div className="activityContainer">Call via: {details.via}</div>
      <div className="activityContainer">Your number: {details.to}</div>
    </div>
  );
};

export default ActivityDetails;
