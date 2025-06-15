import React from 'react';
import '../styles/community.css';

const statsData = [
    { value: '1000+', label: 'Membros ativos' },
    { value: '50+', label: 'Eventos mensais' },
    { value: '200+', label: 'Oportunidades compartilhadas' }
];

function StatCard({ value, label }) {
    return (
        <div className="col-md-4">
            <div className="stat-card">
                <h3 className="display-6 fw-bold mb-2">{value}</h3>
                <p className="mb-0">{label}</p>
            </div>
        </div>
    );
}

function Community() {
  return (
    <section className="community py-5">
      <div className="container text-center">
        <h2 className="display-5 fw-bold mb-4">Nossa Comunidade</h2>
        <p className="lead mb-5">
          Junte-se a milhares de pessoas que já fazem parte da nossa rede de apoio e desenvolvimento.
        </p>
        <div className="row g-4">
            {statsData.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
      </div>
    </section>
  );
}

export default Community;
