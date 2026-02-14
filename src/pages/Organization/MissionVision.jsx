import React from 'react';
import { Card, Row, Col, Typography, Timeline, Tag, Statistic, Progress } from 'antd';
import { 
  RocketOutlined, 
  EyeOutlined, 
  BulbOutlined,
  CheckCircleOutlined,
  FlagOutlined,
  CrownOutlined,
  AimOutlined,
  TeamOutlined,
  ExperimentOutlined,
  RiseOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const MissionVision = () => {
  const strategicObjectives = [
    { id: 1, title: 'Achieve 95% Customer Satisfaction', progress: 78, status: 'on-track', quarter: 'Q1 2024' },
    { id: 2, title: 'Expand to 3 New Markets', progress: 45, status: 'at-risk', quarter: 'Q2 2024' },
    { id: 3, title: 'Launch AI-Powered Platform', progress: 60, status: 'on-track', quarter: 'Q3 2024' },
    { id: 4, title: 'Achieve Carbon Neutrality', progress: 30, status: 'behind', quarter: 'Q4 2024' },
  ];

  const coreValues = [
    { icon: <RocketOutlined />, title: 'Innovation', description: 'Embrace change and drive progress' },
    { icon: <TeamOutlined />, title: 'Collaboration', description: 'Work together to achieve more' },
    { icon: <CheckCircleOutlined />, title: 'Excellence', description: 'Deliver quality in everything we do' },
    { icon: <ExperimentOutlined />, title: 'Integrity', description: 'Act with honesty and transparency' },
  ];

  return (
    <div>
      <Row gutter={[24, 24]}>
        {/* Mission Statement */}
        <Col span={24}>
          <Card 
            style={{ 
              background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
              color: 'white',
              borderRadius: 12
            }}
          >
            <Row align="middle" gutter={24}>
              <Col span={20}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <RocketOutlined style={{ fontSize: 48, color: 'white' }} />
                  <Title level={2} style={{ color: 'white', margin: 0 }}>Our Mission</Title>
                </div>
                <Paragraph style={{ color: 'white', fontSize: 18, marginBottom: 8 }}>
                  "To empower organizations worldwide with intelligent OKR solutions that transform 
                  strategic goals into measurable achievements, fostering a culture of transparency 
                  and continuous improvement."
                </Paragraph>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Vision Statement */}
        <Col span={24}>
          <Card style={{ borderRadius: 12, border: '1px solid #e8eef4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <EyeOutlined style={{ fontSize: 36, color: '#1890ff' }} />
              <Title level={3} style={{ margin: 0 }}>Our Vision</Title>
            </div>
            <Paragraph style={{ fontSize: 16, color: '#5a6a7a' }}>
              "To be the global standard for strategic execution, creating a world where every 
              organization can achieve its full potential through aligned objectives, engaged teams, 
              and data-driven decision making."
            </Paragraph>
          </Card>
        </Col>

        {/* Strategic Objectives */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AimOutlined style={{ color: '#1890ff' }} />
                <span>Strategic Objectives 2024</span>
              </div>
            }
          >
            <Row gutter={[16, 16]}>
              {strategicObjectives.map(obj => (
                <Col span={12} key={obj.id}>
                  <Card size="small" style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <Text strong>{obj.title}</Text>
                      <Tag color={obj.status === 'on-track' ? 'success' : obj.status === 'at-risk' ? 'warning' : 'error'}>
                        {obj.status}
                      </Tag>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <Progress percent={obj.progress} size="small" style={{ flex: 1 }} />
                      <Text type="secondary">{obj.quarter}</Text>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* Core Values */}
        <Col span={24}>
          <Card title="Our Core Values">
            <Row gutter={[16, 16]}>
              {coreValues.map((value, index) => (
                <Col span={6} key={index}>
                  <Card style={{ textAlign: 'center', height: '100%' }}>
                    <div style={{ fontSize: 32, color: '#1890ff', marginBottom: 16 }}>
                      {value.icon}
                    </div>
                    <Title level={4} style={{ marginBottom: 8 }}>{value.title}</Title>
                    <Text type="secondary">{value.description}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* Key Milestones */}
        <Col span={24}>
          <Card title="Strategic Milestones">
            <Timeline mode="alternate">
              <Timeline.Item color="green">
                <Text strong>Q1 2024</Text>
                <div>Launch Customer Experience Enhancement Program</div>
                <Tag color="success" style={{ marginTop: 4 }}>Completed</Tag>
              </Timeline.Item>
              <Timeline.Item color="blue">
                <Text strong>Q2 2024</Text>
                <div>International Market Expansion</div>
                <Progress percent={45} size="small" style={{ width: 200, marginTop: 8 }} />
              </Timeline.Item>
              <Timeline.Item color="blue">
                <Text strong>Q3 2024</Text>
                <div>AI Platform Launch</div>
                <Progress percent={60} size="small" style={{ width: 200, marginTop: 8 }} />
              </Timeline.Item>
              <Timeline.Item color="orange">
                <Text strong>Q4 2024</Text>
                <div>Sustainability Certification</div>
                <Progress percent={30} size="small" style={{ width: 200, marginTop: 8 }} />
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MissionVision;