import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import ProjectDetail from '../components/works/ProjectDetail';
import { PROJECTS } from '../data/projects';

const PageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9000;
  overflow-y: auto;
  overflow-x: hidden;
  background: #050505;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #050505;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #66FCF1;
    border-radius: 4px;
  }
`;

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const project = PROJECTS.find(p => p.id === parseInt(projectId));

  useEffect(() => {
    // Prevent body scroll when detail page opens
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!project) {
    // Project not found, redirect to home
    useEffect(() => {
      navigate('/');
    }, [navigate]);
    return null;
  }

  const handleClose = () => {
    navigate('/#works'); // Navigate back to home with works section hash
  };

  return (
    <>
      <Helmet>
        <title>{project.title} | S. Yoga Vignesh Portfolio</title>
        <meta name="description" content={`${project.title} - ${project.cat}. ${project.challenge || 'View project details and technical implementation.'}`} />
        <meta name="keywords" content={`${project.tech?.join(', ')}, ${project.title}, ${project.cat}`} />
        <link rel="canonical" href={`https://yogavignesh.me/work/${project.id}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://yogavignesh.me/work/${project.id}`} />
        <meta property="og:title" content={`${project.title} | S. Yoga Vignesh`} />
        <meta property="og:description" content={project.challenge || `${project.cat} project by S. Yoga Vignesh`} />
        <meta property="og:image" content={`https://yogavignesh.me${project.img2 || project.img}`} />
        
        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://yogavignesh.me/work/${project.id}`} />
        <meta property="twitter:title" content={`${project.title} | S. Yoga Vignesh`} />
        <meta property="twitter:description" content={project.challenge || `${project.cat} project`} />
        <meta property="twitter:image" content={`https://yogavignesh.me${project.img2 || project.img}`} />
      </Helmet>

      <PageContainer data-lenis-prevent>
        <ProjectDetail project={project} onClose={handleClose} />
      </PageContainer>
    </>
  );
}
