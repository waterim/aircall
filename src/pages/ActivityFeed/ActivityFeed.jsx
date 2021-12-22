import React, { useState, useEffect } from "react";
import './ActivityFeed.scss'
import axios from "../../API/axios-instance";
import { getTime } from "../../shared/common";
import Card from "../../components/Card/Card";

const ActivityFeed = (props) => {
  const [calls, setCalls] = useState();
  const getCalls = (url) => {
    axios
      .get(url)
      .then((res) => {
        const sorted = sortArray(res.data);
        setCalls(creatGroupedObject(sorted));
      })
      .catch((err) => console.error(err));
  };

  const sortArray = (arrayToBeSort) => {
    return arrayToBeSort.slice().sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });
  };

  const creatGroupedObject = (data) => {
    const groups = data.reduce((groups, call) => {
      const date = call.created_at.split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(call);
      return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        call: groups[date],
      };
    });
    return groupArrays;
  };

  useEffect(() => {
    getCalls("/activities");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="activityFeed">
      {calls &&
        calls.map((callData) => {
          const callsByDate = callData.call;
          return (
            <>
              <h1>{callData.date}</h1>
              {callsByDate.map((call) => (
                <Card
                  key={call.id}
                  call={call}
                  time={getTime(call.created_at)}
                />
              ))}
            </>
          );
        })}
    </div>
  );
};

export default ActivityFeed;
