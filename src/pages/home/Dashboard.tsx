import React, { useEffect } from 'react';
import AppLayout from '../../layouts/AppLayout';
import { useNavigate } from 'react-router-dom';
import UserChartCard from '../../components/charts/UserChart';

const Dashboard: React.FC = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <AppLayout>
      <UserChartCard />
    </AppLayout>
  );
};

export default Dashboard;
