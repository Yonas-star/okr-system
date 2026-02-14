import React, { useState } from 'react';
import { Card, Progress, Tag, Button, Row, Col, Statistic, Table, Space } from 'antd';
import { 
  RiseOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  TeamOutlined,
  TrophyOutlined
} from '@ant-design/icons';

const Dashboard = () => {
  const [okrs] = useState([
    {
      id: 1,
      objective: "Increase Customer Satisfaction",
      progress: 65,
      owner: "Sarah Chen",
      status: "on-track",
      keyResults: [
        { id: 101, title: "Improve NPS score to 70", progress: 60, status: "on-track" },
        { id: 102, title: "Reduce response time to < 2hrs", progress: 80, status: "on-track" },
        { id: 103, title: "Achieve 95% satisfaction rate", progress: 55, status: "at-risk" }
      ]
    },
    {
      id: 2,
      objective: "Drive Revenue Growth",
      progress: 45,
      owner: "Mike Johnson",
      status: "at-risk",
      keyResults: [
        { id: 201, title: "Increase ARR to $5M", progress: 40, status: "at-risk" },
        { id: 202, title: "Close 20 enterprise deals", progress: 35, status: "behind" },
        { id: 203, title: "Launch new pricing model", progress: 60, status: "on-track" }
      ]
    },
    {
      id: 3,
      objective: "Enhance Product Quality",
      progress: 80,
      owner: "Alex Rivera",
      status: "on-track",
      keyResults: [
        { id: 301, title: "Reduce bug rate by 40%", progress: 75, status: "on-track" },
        { id: 302, title: "Achieve 99.9% uptime", progress: 85, status: "on-track" },
        { id: 303, title: "Complete security audit", progress: 100, status: "completed" }
      ]
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'on-track': return 'success';
      case 'at-risk': return 'warning';
      case 'behind': return 'error';
      case 'completed': return 'processing';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'on-track': return 'On Track';
      case 'at-risk': return 'At Risk';
      case 'behind': return 'Behind';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const columns = [
    {
      title: 'Objective',
      dataIndex: 'objective',
      key: 'objective',
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress) => (
        <div style={{ width: 120 }}>
          <Progress percent={progress} size="small" status={progress < 40 ? 'exception' : 'active'} />
        </div>
      ),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button type="link" size="small">
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>OKR Dashboard</h1>
          <p style={{ color: '#8c8c8c', margin: '4px 0 0 0' }}>Q1 2024 · Product Team</p>
        </div>
        <Button icon={<PlusOutlined />} type="primary">
          New Objective
        </Button>
      </div>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="Overall Progress"
              value={63}
              suffix="%"
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
            <div style={{ marginTop: 8, color: '#8c8c8c', fontSize: 12 }}>
              <ArrowUpOutlined /> 12% from last quarter
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="On Track"
              value={12}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div style={{ marginTop: 8, color: '#8c8c8c', fontSize: 12 }}>
              8 objectives completed
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="At Risk"
              value={5}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
            <div style={{ marginTop: 8, color: '#8c8c8c', fontSize: 12 }}>
              Needs attention
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="Key Results"
              value={24}
              suffix="/ 36"
              prefix={<ClockCircleOutlined />}
            />
            <div style={{ marginTop: 8, color: '#8c8c8c', fontSize: 12 }}>
              12 remaining this quarter
            </div>
          </Card>
        </Col>
      </Row>

      {/* OKRs Table */}
      <Card 
        title="Objectives & Key Results" 
        extra={<Button type="link">View All</Button>}
        style={{ marginBottom: 24 }}
      >
        <Table 
          columns={columns} 
          dataSource={okrs} 
          rowKey="id"
          pagination={false}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ paddingLeft: 32 }}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {record.keyResults.map((kr) => (
                    <div key={kr.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ fontWeight: 500 }}>{kr.title}</span>
                        <Tag color={getStatusColor(kr.status)} size="small">
                          {getStatusText(kr.status)}
                        </Tag>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Progress percent={kr.progress} size="small" style={{ flex: 1 }} />
                        <span style={{ fontSize: 12, color: '#8c8c8c' }}>{kr.progress}%</span>
                      </div>
                    </div>
                  ))}
                </Space>
              </div>
            ),
          }}
        />
      </Card>

      {/* Team Progress and Recent Updates */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title={<span><TeamOutlined /> Team Progress</span>}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>Product Team</span>
                  <span style={{ color: '#52c41a' }}>78%</span>
                </div>
                <Progress percent={78} status="active" />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>Engineering Team</span>
                  <span style={{ color: '#1890ff' }}>65%</span>
                </div>
                <Progress percent={65} status="active" />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>Sales Team</span>
                  <span style={{ color: '#faad14' }}>42%</span>
                </div>
                <Progress percent={42} status="exception" />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>Marketing Team</span>
                  <span style={{ color: '#52c41a' }}>71%</span>
                </div>
                <Progress percent={71} status="active" />
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={<span><TrophyOutlined /> Recent Updates</span>}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ 
                  width: 32, 
                  height: 32, 
                  background: '#e6f7ff', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#1890ff'
                }}>
                  SC
                </div>
                <div>
                  <div><strong>Sarah Chen</strong> updated NPS score KR</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>2 hours ago</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ 
                  width: 32, 
                  height: 32, 
                  background: '#f6ffed', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#52c41a'
                }}>
                  MJ
                </div>
                <div>
                  <div><strong>Mike Johnson</strong> added new key result</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>5 hours ago</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ 
                  width: 32, 
                  height: 32, 
                  background: '#f9f0ff', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#722ed1'
                }}>
                  AR
                </div>
                <div>
                  <div><strong>Alex Rivera</strong> completed security audit</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>Yesterday</div>
                </div>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;