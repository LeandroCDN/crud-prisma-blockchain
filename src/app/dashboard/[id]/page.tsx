"use client";
import { useLoading } from "../../../context/loadingContext";

const Dashboard = ({ params }) => {
  const { userData, setUserData } = useLoading();
  // const id = params.json();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {params.id}
      <p>iD: {userData.id} </p>
      <p>Name: {userData.name} </p>
      <p>Create At:{userData.cretedAt} </p>
    </div>
  );
};

export default Dashboard;
