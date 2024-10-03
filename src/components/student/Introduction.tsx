import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { BookOutlined, RocketOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const Introduction: React.FC = () => {
  const features: Feature[] = [
    { icon: <BookOutlined />, title: 'Diverse Courses', desc: 'Explore a wide range of subjects taught by expert instructors.' },
    { icon: <RocketOutlined />, title: 'Learn at Your Pace', desc: 'Flexible learning schedules to fit your busy lifestyle.' },
    { icon: <TeamOutlined />, title: 'Community Support', desc: 'Join a vibrant community of learners and educators.' },
  ];

  return (
    <>
      <section className="mb-16 text-center">
        <Title level={1} className="text-5xl font-bold text-indigo-900 mb-6">
          Welcome to Edu Learn
        </Title>
        <Paragraph className="text-xl text-gray-700 max-w-3xl mx-auto">
          Elevate your learning experience with our premium online education platform. 
          Discover a world of knowledge curated by industry experts.
        </Paragraph>
      </section>

      <section className="mb-16">
        <Title level={2} className="text-4xl font-semibold text-indigo-800 mb-8 text-center">
          Why Choose Edu Learn?
        </Title>
        <Row gutter={[24, 24]} justify="center">
          {features.map((feature, index) => (
            <Col xs={24} sm={8} key={index}>
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300" hoverable>
                <div className="text-5xl text-indigo-600 mb-6">{feature.icon}</div>
                <Title level={4} className="mb-4">{feature.title}</Title>
                <Paragraph className="text-gray-600">{feature.desc}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
};

export default Introduction;
