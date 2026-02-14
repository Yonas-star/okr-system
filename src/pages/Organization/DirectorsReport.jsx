import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Table, Tag, Progress, Tabs, Select, Space, Statistic, Badge, Steps } from 'antd';
import { 
  FileTextOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  BarChartOutlined,
  PieChartOutlined,
  DownloadOutlined,
  SendOutlined,
  UnlockOutlined,
  EyeOutlined,
  EditOutlined,
  TeamOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const DirectorsReport = () => {
  const [reportType, setReportType] = useState('quarterly');
  const [permissions, setPermissions] = useState({
    directors: ['read', 'write', 'approve'],
    divisionHeads: ['read', 'write'],
    employees: ['read']
  });

  const kpiData = [
    {
      key: '1',
      kpi: 'Revenue Growth',
      target: '25%',
      actual: '18%',
      progress: 72,
      status: 'at-risk',
      owner: 'Mike Johnson',
    },
    {
      key: '2',
      kpi: 'Customer Satisfaction',
      target: '95%',
      actual: '87%',
      progress: 82,
      status: 'on-track',
      owner: 'Sarah Chen',
    },
    {
      key: '3',
      kpi: 'Market Share',
      target: '15%',
      actual: '12%',
      progress: 80,
      status: 'on-track',
      owner: 'Alex Rivera',
    },
    {
      key: '4',
      kpi: 'Employee Engagement',
      target: '85%',
      actual: '72%',
      progress: 65,
      status: 'at-risk',
      owner: 'HR Team',
    },
    {
      key: '5',
      kpi: 'Product Innovation',
      target: '10 Features',
      actual: '6 Features',
      progress: 60,
      status: 'behind',
      owner: 'Product Team',
    },
  ];

  const thematicAreas = [
    {
      id: 1,
      theme: 'Digital Transformation',
      budget: '$2.5M',
      progress: 65,
      status: 'on-track',
      directorate: 'Technology',
      initiatives: ['Cloud Migration', 'AI Implementation', 'Legacy Modernization']
    },
    {
      id: 2,
      theme: 'Customer Experience',
      budget: '$1.8M',
      progress: 45,
      status: 'at-risk',
      directorate: 'Operations',
      initiatives: ['NPS Improvement', 'Support Automation', 'Feedback System']
    },
    {
      id: 3,
      theme: 'Market Expansion',
      budget: '$3.2M',
      progress: 30,
      status: 'behind',
      directorate: 'Sales',
      initiatives: ['APAC Entry', 'EU Growth', 'Partnership Program']
    },
    {
      id: 4,
      theme: 'Sustainability',
      budget: '$1.2M',
      progress: 70,
      status: 'on-track',
      directorate: 'Corporate',
      initiatives: ['Carbon Reduction', 'Green Energy', 'Waste Management']
    },
  ];

  const structureTypes = [
    { id: 1, name: 'Product Directorate', head: 'Sarah Chen', members: 45, level: 2 },
    { id: 2, name: 'Engineering Division', head: 'Alex Rivera', members: 28, level: 3 },
    { id: 3, name: 'Sales Division', head: 'Mike Johnson', members: 35, level: 3 },
    { id: 4, name: 'Marketing Team', head: 'Emma Wilson', members: 15, level: 4 },
  ];

  const reportColumns = [
    {
      title: 'KPI',
      dataIndex: 'kpi',
      key: 'kpi',
    },
    {
      title: 'Target',
      dataIndex: 'target',
      key: 'target',
    },
    {
      title: 'Actual',
      dataIndex: 'actual',
      key: 'actual',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'on-track' ? 'green' : status === 'at-risk' ? 'orange' : 'red';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
  ];

  const requestSteps = [
    {
      title: 'Draft Report',
      description: 'Director prepares quarterly report',
      status: 'process',
    },
    {
      title: 'Director Review',
      description: 'Pending approval from Board',
      status: 'wait',
    },
    {
      title: 'Division Review',
      description: 'Pending feedback from divisions',
      status: 'wait',
    },
    {
      title: 'Published',
      description: 'Report shared with organization',
      status: 'wait',
    },
  ];

  return (
    <div>
      <Row gutter={[24, 24]}>
        {/* Header */}
        <Col span={24}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Title level={2}>Director's Report</Title>
              <Text type="secondary">Q1 2024 · Strategic Performance Review</Text>
            </div>
            <Space>
              <Select defaultValue="quarterly" style={{ width: 150 }} onChange={setReportType}>
                <Option value="quarterly">Quarterly Report</Option>
                <Option value="monthly">Monthly Report</Option>
                <Option value="annual">Annual Report</Option>
              </Select>
              <Button icon={<DownloadOutlined />}>Export</Button>
              <Button type="primary" icon={<SendOutlined />}>Submit Report</Button>
            </Space>
          </div>
        </Col>

        {/* Report Request Section */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileTextOutlined style={{ color: '#1890ff' }} />
                <span>Report Request & Approval Workflow</span>
              </div>
            }
          >
            <Row gutter={[24, 24]}>
              <Col span={16}>
                <Steps current={0} items={requestSteps} />
              </Col>
              <Col span={8}>
                <Card size="small" style={{ background: '#fafafa' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text strong>Requested By:</Text>
                      <Text>Board of Directors</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text strong>Due Date:</Text>
                      <Text type="danger">March 30, 2024</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text strong>Status:</Text>
                      <Badge status="processing" text="In Progress" />
                    </div>
                    <Button type="primary" block>Submit for Approval</Button>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* KPI Dashboard */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BarChartOutlined style={{ color: '#1890ff' }} />
                <span>Key Performance Indicators</span>
              </div>
            }
            extra={<Button type="link">View All KPIs</Button>}
          >
            <Table 
              columns={reportColumns} 
              dataSource={kpiData} 
              pagination={false}
            />
          </Card>
        </Col>

        {/* Permissions Section */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <UnlockOutlined style={{ color: '#1890ff' }} />
                <span>Report Permissions</span>
              </div>
            }
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card size="small" style={{ background: '#f0f5ff' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong>Directors</Text>
                      <Tag color="blue">Level 4</Tag>
                    </div>
                    <div>
                      {permissions.directors.map(perm => (
                        <Tag key={perm} color="success" style={{ marginRight: 8 }}>
                          {perm}
                        </Tag>
                      ))}
                    </div>
                    <Text type="secondary">Full access including approval rights</Text>
                  </Space>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" style={{ background: '#f6ffed' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong>Division Heads</Text>
                      <Tag color="green">Level 3</Tag>
                    </div>
                    <div>
                      {permissions.divisionHeads.map(perm => (
                        <Tag key={perm} color="processing" style={{ marginRight: 8 }}>
                          {perm}
                        </Tag>
                      ))}
                    </div>
                    <Text type="secondary">Can view and contribute</Text>
                  </Space>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" style={{ background: '#fff7e6' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong>Employees</Text>
                      <Tag color="orange">Level 1</Tag>
                    </div>
                    <div>
                      {permissions.employees.map(perm => (
                        <Tag key={perm} color="default" style={{ marginRight: 8 }}>
                          {perm}
                        </Tag>
                      ))}
                    </div>
                    <Text type="secondary">Read-only access</Text>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Thematic Areas */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <PieChartOutlined style={{ color: '#1890ff' }} />
                <span>Thematic Areas & Initiatives</span>
              </div>
            }
          >
            <Row gutter={[16, 16]}>
              {thematicAreas.map(theme => (
                <Col span={12} key={theme.id}>
                  <Card size="small" hoverable>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <div>
                        <Text strong style={{ fontSize: 16 }}>{theme.theme}</Text>
                        <div>
                          <Tag color={theme.status === 'on-track' ? 'success' : theme.status === 'at-risk' ? 'warning' : 'error'}>
                            {theme.status}
                          </Tag>
                          <Tag color="blue">{theme.directorate}</Tag>
                        </div>
                      </div>
                      <Statistic title="Budget" value={theme.budget} precision={0} />
                    </div>
                    
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text>Progress</Text>
                        <Text strong>{theme.progress}%</Text>
                      </div>
                      <Progress percent={theme.progress} size="small" status={theme.progress < 40 ? 'exception' : 'active'} />
                    </div>

                    <div>
                      <Text type="secondary">Key Initiatives:</Text>
                      <div style={{ marginTop: 8 }}>
                        {theme.initiatives.map((initiative, index) => (
                          <Tag key={index} color="processing" style={{ marginBottom: 4 }}>
                            {initiative}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* Organizational Structure */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TeamOutlined style={{ color: '#1890ff' }} />
                <span>Organizational Structure</span>
              </div>
            }
          >
            <Table 
              dataSource={structureTypes}
              columns={[
                {
                  title: 'Unit',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: 'Head',
                  dataIndex: 'head',
                  key: 'head',
                },
                {
                  title: 'Members',
                  dataIndex: 'members',
                  key: 'members',
                },
                {
                  title: 'Level',
                  dataIndex: 'level',
                  key: 'level',
                  render: (level) => (
                    <Tag color={level === 2 ? 'blue' : level === 3 ? 'green' : 'orange'}>
                      Level {level}
                    </Tag>
                  )
                },
                {
                  title: 'Actions',
                  key: 'actions',
                  render: () => (
                    <Space>
                      <Button type="text" icon={<EyeOutlined />} size="small" />
                      <Button type="text" icon={<EditOutlined />} size="small" />
                    </Space>
                  )
                }
              ]}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DirectorsReport;