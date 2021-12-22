import React, { useState, useEffect } from "react";
import axios from "../../API/axios-instance";
import { getTime } from "../../shared/common";
import Card from "../../components/Card/Card";
import './Archive.scss'

const Archive = (props) => {
  const [calls, setCalls] = useState();
  const getCalls = (url) => {
    axios
      .get(url)
      .then((res) => {
        const archivedCalls = res.data.filter(
          (call) => call.is_archived === true
        );
        setCalls(archivedCalls);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCalls("/activities");
  }, []);

  return (
    <div className="archive">
      {calls && calls.length > 0 ? (
        calls.map((call) => {
          return (
            <Card key={call.id} call={call} time={getTime(call.created_at)} />
          );
        })
      ) : (
        <h1>Archive is empty</h1>
      )}
    </div>
  );
};

export default Archive;
