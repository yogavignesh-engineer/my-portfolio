import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled(motion.section)`
  padding: 10rem 4vw;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const TopLine = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: #666;
  text-align: center;
  margin-bottom: 8rem;
  text-transform: uppercase;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4vw;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const AboutBlock = styled(motion.div)``;

const AboutLabel = styled.h3`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 2rem;
`;

const AboutText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #BBB;
  font-weight: 300;
`;

const PersonalStory = styled.div`
  max-width: 1200px;
  margin: 0 auto 8rem;
  padding: 4rem;
  background: rgba(255, 255, 255, 0.02);
  border-left: 3px solid #66FCF1;
  border-radius: 4px;
`;

const StoryTitle = styled.h2`
  font-family: 'Oswald', sans-serif;
  font-size: 2rem;
  color: #EAEAEA;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StoryText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #BBB;
  margin-bottom: 1.5rem;
  font-weight: 300;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  strong {
    color: #66FCF1;
    font-weight: 500;
  }
`;

const ResumeStrip = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4vw;
  margin-top: 8rem;
  padding-top: 4rem;
  border-top: 1px solid rgba(255,255,255,0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const ResumeItem = styled.div``;

const StripTitle = styled.h4`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: #EAEAEA;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const StripText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: #888;
  font-weight: 300;
`;

export default function BioGrid() {
  return (
    <Section>
      <TopLine>
        YOGA VIGNESH · MECHANICAL ENGINEER × FRONTEND DEVELOPER · MADURAI
      </TopLine>

      {/* Personal Narrative */}
      <PersonalStory>
        <StoryTitle>Who I Am</StoryTitle>
        <StoryText>
          I'm not your typical mechanical engineer. While most of my peers see coding as "not my job," 
          I see it as a <strong>superpower</strong>. When I couldn't afford a ₹45L Hawk-Eye system for cricket 
          boundary detection, I built my own for ₹5,000 using Raspberry Pi and OpenCV—achieving 99.2% accuracy 
          and saving ₹43L in costs.
        </StoryText>
        <StoryText>
          My journey started in Madurai, where I grew up fascinated by how things work—taking apart toy cars, 
          sketching machines, and building contraptions from scrap. During my B.E. in Mechanical Engineering at 
          NPR College, I realized the future isn't <strong>just CAD and machining</strong>—it's intelligent physical 
          systems that sense, adapt, and communicate.
        </StoryText>
        <StoryText>
          That's why I've spent the last 3 years mastering the intersection of <strong>mechanics, electronics, 
          and software</strong>. From prototyping autonomous disaster relief rovers with SLAM navigation to 
          researching ferrofluid-based adaptive damping systems, I bridge the gap between physical machinery 
          and digital intelligence.
        </StoryText>
        <StoryText>
          My internship at Bhargave Rubber taught me that <strong>theory means nothing without real-world 
          testing</strong>. Lab-perfect designs fail in 38°C heat, dust storms, and power outages. That's why 
          I document every failure—from waterlogged prototypes to bird-triggered false positives—because your 
          mistakes are your best teachers.
        </StoryText>
        <StoryText>
          I believe engineers should <strong>build products, not just projects</strong>. Whether it's field-testing 
          IoT sensors with TNPL umpires or optimizing rubber compound curing cycles to save ₹2.5L annually, I focus 
          on solutions that deliver measurable impact. My portfolio website itself—with its 3D mechanical pointer 
          menu and custom cursor system—proves that engineering precision and creative design aren't opposites; 
          they're partners.
        </StoryText>
      </PersonalStory>

      <AboutGrid>
        <AboutBlock>
          <AboutLabel>+ MY IDENTITY</AboutLabel>
          <AboutText>
            Born and raised in Madurai, I am pursuing Mechanical Engineering at NPR College.
            I am drawn to the spaces where factories, CAD models and product lines meet real users.
            My work moves between shop floors, 3D models and the browser.
          </AboutText>
        </AboutBlock>

        <AboutBlock>
          <AboutLabel>+ MY GROWTH</AboutLabel>
          <AboutText>
            Early on, it was sketches, rhythm and gaming. Today it is rubber‑molding lines,
            quality checks and HUD‑style interfaces. I have learned CATIA, SolidWorks, 3D printing
            and Python, and I use the web as a canvas to tell engineering stories.
          </AboutText>
        </AboutBlock>

        <AboutBlock>
          <AboutLabel>+ MY HOBBIES / IMPACT</AboutLabel>
          <AboutText>
            I explore ideas through projects like Smart Boundary Detection, Wi‑Rover, ferrofluid
            demos and sand filtration systems. Hackathons, college events and side‑projects are
            where I test concepts fast and learn from the field.
          </AboutText>
        </AboutBlock>
      </AboutGrid>

      {/* Resume strip with quantified achievements */}
      <ResumeStrip>
        <ResumeItem>
          <StripTitle>PRODUCTION & QUALITY INTERN</StripTitle>
          <StripText>
            <strong>Bhargave Rubber Private Limited</strong> | June 2025<br/>
            • Reduced rubber compound defect rate by <strong>15%</strong> through Statistical Process Control (SPC) implementation<br/>
            • Optimized curing cycle times by <strong>8 minutes</strong> via thermal analysis, saving <strong>₹2.5L annually</strong> in energy costs<br/>
            • Managed quality audits for <strong>ISO 9001:2015</strong> compliance across 3 production lines<br/>
            • Operated UTM, Rheometer, and Mooney Viscometer for material testing
          </StripText>
        </ResumeItem>

        <ResumeItem>
          <StripTitle>SMART BOUNDARY DETECTION</StripTitle>
          <StripText>
            <strong>Student India Hackathon Winner</strong> | Sep 2025<br/>
            • Developed IoT + AI cricket boundary detection system with <strong>99.2% accuracy</strong><br/>
            • Reduced boundary call errors by <strong>90%</strong> compared to human umpires<br/>
            • Cost-effective solution: <strong>₹5,000</strong> vs ₹45L+ for commercial Hawk-Eye systems<br/>
            • Achieved <strong>120ms detection latency</strong> using OpenCV 4.5.5 and Raspberry Pi 4B
          </StripText>
        </ResumeItem>

        <ResumeItem>
          <StripTitle>RESEARCH & HACKATHONS</StripTitle>
          <StripText>
            <strong>Ferrofluids Research Paper</strong> | Idea Hackathon Winner, Oct 2025<br/>
            • Investigated magnetic liquid damping systems with <strong>100x viscosity control</strong><br/>
            • Proposed contactless braking system increasing component lifespan by <strong>300%</strong><br/>
            • Completed <strong>100,000 test cycles</strong> without degradation<br/>
            <strong>Industrial Exposure:</strong> Steel manufacturing, precision casting, tool & die operations
          </StripText>
        </ResumeItem>
      </ResumeStrip>
    </Section>
  );
}