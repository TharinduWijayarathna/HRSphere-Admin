import React, { useEffect } from 'react';
import AppLayout from '../../layouts/AppLayout';
import { useNavigate } from 'react-router-dom';
import UserChart from '../../components/charts/UserChart';
import DashboardCard from '../../components/charts/UserChart';

const Dashboard: React.FC = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <AppLayout>
      <DashboardCard />
    </AppLayout>
  );
};

export default Dashboard;
