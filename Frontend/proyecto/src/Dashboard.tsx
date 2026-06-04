import React from 'react';
import './Dashboard.css';

const ucrCampusImg = 'https://www.ucr.ac.cr/medios/fotos/2023/rs271890__dsc4502-web-644ad434e7882.jpg';

const Dashboard: React.FC = () => (
  <div className="dashboard-page">
    <h1 className="dashboard-title">Tu legado continúa aquí</h1>
    <img src={ucrCampusImg} alt="UCR Campus" className="dashboard-hero" />
    {/* Add additional dashboard widgets here */}
  </div>
);

export default Dashboard;
