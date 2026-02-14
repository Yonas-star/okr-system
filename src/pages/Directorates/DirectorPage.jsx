import React, { useState } from 'react';
import { Card, Row, Col, Typography, Progress, Tabs, Table, Tag, Button, Statistic, Timeline, List, Avatar, Badge, Space, Select, Modal, Form, Input, message } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined,
  RocketOutlined,
  EyeOutlined,
  BarChartOutlined,
  FileTextOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  FlagOutlined,
  DownloadOutlined,
  SendOutlined,
  DashboardOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import KanbanBoard from '../../components/KanbanBoard';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const DirectorPage = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [isThemeModalVisible, setIsThemeModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Director's Mission & Vision
  const directorMission = {
    mission: "To drive technological innovation and operational excellence across all directorates, enabling data-driven decision making and fostering a culture of continuous improvement.",
    vision: "To be recognized as the world's most effective strategic execution unit, setting the standard for OKR implementation and organizational alignment.",
    thematics: [
      { id: 1, name: 'Digital Transformation', progress: 65, status: 'on-track', budget: '$2.5M' },
      { id: 2, name: 'Customer Excellence', progress: 45, status: 'at-risk', budget: '$1.8M' },
      { id: 3, name: 'Operational Efficiency', progress: 70, status: 'on-track', budget: '$1.2M' },
      { id: 4, name: 'Innovation Culture', progress: 55, status: 'on-track', budget: '$900K' },
    ]
  };

  // Directorate Objectives
  const directorateObjectives = [
    {
      id: 1,
      objective: "Achieve 40% Digital Adoption Rate",
      progress: 65,
      owner: "Sarah Chen",
      status: "on-track",
      quarter: "Q1 2024",
      keyResults: [
        { id: 101, title: "Migrate 20 enterprise clients to cloud", progress: 70, status: "on-track" },
        { id: 102, title: "Implement AI-powered analytics", progress: 45, status: "at-risk" },
        { id: 103, title: "Train 500 employees on new tools", progress: 80, status: "on-track" }
      ]
    },
    {
      id: 2,
      objective: "Improve Customer NPS to 75",
      progress: 55,
      owner: "Mike Johnson",
      status: "at-risk",
      quarter: "Q1 2024",
      keyResults: [
        { id: 201, title: "Reduce response time to < 1hr", progress: 60, status: "on-track" },
        { id: 202, title: "Implement customer feedback loop", progress: 40, status: "behind" },
        { id: 203, title: "Achieve 90% satisfaction rate", progress: 65, status: "on-track" }
      ]
    }
  ];

  // Reports
  const reports = [
    { id: 1, title: 'Q1 2024 Strategic Review', status: 'draft', dueDate: '2024-03-30', submittedBy: 'Director Office' },
    { id: 2, title: 'Digital Transformation Progress', status: 'submitted', dueDate: '2024-03-15', submittedBy: 'Sarah Chen' },
    { id: 3, title: 'Monthly Performance Dashboard', status: 'approved', dueDate: '2024-03-10', submittedBy: 'Analytics Team' },
  ];

  // Thematic Plans
  const thematicPlans = [
    {
      id: 1,
      theme: 'Digital Transformation',
      progress: 65,
      status: 'on-track',
      initiatives: [
        { name: 'Cloud Migration', progress: 70, owner: 'IT Team', deadline: 'Q2 2024' },
        { name: 'AI Implementation', progress: 45, owner: 'Data Science', deadline: 'Q3 2024' },
        { name: 'Legacy Modernization', progress: 80, owner: 'Engineering', deadline: 'Q1 2024' }
      ]
    },
    {
      id: 2,
      theme: 'Customer Excellence',
      progress: 45,
      status: 'at-risk',
      initiatives: [
        { name: 'NPS Improvement', progress: 50, owner: 'Customer Success', deadline: 'Q2 2024' },
        { name: 'Support Automation', progress: 35, owner: 'Product', deadline: 'Q3 2024' },
        { name: 'Feedback System', progress: 50, owner: 'Engineering', deadline: 'Q2 2024' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'on-track': return 'success';
      case 'at-risk': return 'warning';
      case 'behind': return 'error';
      case 'completed': return 'processing';
      case 'draft': return 'default';
      case 'submitted': return 'processing';
      case 'approved': return 'success';
      default: return 'default';
    }
  };

  const objectiveColumns = [
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
          <Progress percent={progress} size="small" />
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
          {status.replace('-', ' ').toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Quarter',
      dataIndex: 'quarter',
      key: 'quarter',
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
      <Row gutter={[24, 24]}>
        {/* Header */}
        <Col span={24}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Title level={2}>Director's Dashboard</Title>
              <Text type="secondary">Dr. Sarah Mitchell · Chief Strategy Officer</Text>
            </div>
            <Space>
              <Button icon={<DownloadOutlined />}>Export Report</Button>
              <Button type="primary" icon={<SendOutlined />}>Submit Board Report</Button>
            </Space>
          </div>
        </Col>

        {/* Organization Overview */}
        <Col span={24}>
          <Card>
            <Row gutter={[24, 24]} align="middle">
              <Col span={6}>
                <Statistic 
                  title="Total Directorates" 
                  value={4} 
                  prefix={<TeamOutlined />} 
                />
              </Col>
              <Col span={6}>
                <Statistic 
                  title="Active OKRs" 
                  value={24} 
                  prefix={<CheckCircleOutlined />} 
                />
              </Col>
              <Col span={6}>
                <Statistic 
                  title="Completion Rate" 
                  value={68} 
                  suffix="%" 
                  prefix={<CheckCircleOutlined />} 
                />
              </Col>
              <Col span={6}>
                <Statistic 
                  title="Team Members" 
                  value={128} 
                  prefix={<UserOutlined />} 
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Mission & Vision */}
        <Col span={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <RocketOutlined style={{ color: '#1890ff' }} />
                <span>Director's Mission & Vision</span>
              </div>
            }
            style={{ height: '100%' }}
          >
            <div style={{ marginBottom: 24 }}>
              <Text strong style={{ fontSize: 16 }}>Mission</Text>
              <Paragraph style={{ marginTop: 8 }}>
                {directorMission.mission}
              </Paragraph>
            </div>
            <div>
              <Text strong style={{ fontSize: 16 }}>Vision</Text>
              <Paragraph style={{ marginTop: 8 }}>
                {directorMission.vision}
              </Paragraph>
            </div>
          </Card>
        </Col>

        {/* Thematic Areas */}
        <Col span={12}>
          <Card 
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FlagOutlined style={{ color: '#1890ff' }} />
                  <span>Thematic Plans</span>
                </div>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  size="small"
                  onClick={() => setIsThemeModalVisible(true)}
                >
                  New Theme
                </Button>
              </div>
            }
          >
            <List
              itemLayout="horizontal"
              dataSource={directorMission.thematics}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.name}
                    description={
                      <div style={{ marginTop: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <Progress percent={item.progress} size="small" />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                          <Tag color={getStatusColor(item.status)}>{item.status}</Tag>
                          <Text type="secondary">Budget: {item.budget}</Text>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* OKR Tracking Dashboard */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <DashboardOutlined style={{ color: '#1890ff' }} />
                <span>Objectives & Key Results Tracking</span>
              </div>
            }
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab="Grid View" key="1">
                <Table 
                  columns={objectiveColumns} 
                  dataSource={directorateObjectives} 
                  rowKey="id"
                  expandable={{
                    expandedRowRender: (record) => (
                      <div style={{ paddingLeft: 32 }}>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                          {record.keyResults.map((kr) => (
                            <div key={kr.id}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <span style={{ fontWeight: 500 }}>{kr.title}</span>
                                <Tag color={getStatusColor(kr.status)}>
                                  {kr.status}
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
              </TabPane>
              <TabPane tab="Kanban View" key="2">
                <KanbanBoard />
              </TabPane>
            </Tabs>
          </Card>
        </Col>

        {/* Reports & Communications */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileTextOutlined style={{ color: '#1890ff' }} />
                <span>Director's Reports</span>
              </div>
            }
          >
            <Table 
              dataSource={reports}
              columns={[
                {
                  title: 'Report Title',
                  dataIndex: 'title',
                  key: 'title',
                },
                {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status) => (
                    <Tag color={getStatusColor(status)}>
                      {status.toUpperCase()}
                    </Tag>
                  )
                },
                {
                  title: 'Due Date',
                  dataIndex: 'dueDate',
                  key: 'dueDate',
                },
                {
                  title: 'Submitted By',
                  dataIndex: 'submittedBy',
                  key: 'submittedBy',
                },
                {
                  title: 'Actions',
                  key: 'actions',
                  render: (_, record) => (
                    <Space>
                      <Button type="text" icon={<EyeOutlined />} size="small" />
                      {record.status === 'draft' && (
                        <Button type="text" icon={<EditOutlined />} size="small" />
                      )}
                      <Button type="text" icon={<DownloadOutlined />} size="small" />
                    </Space>
                  )
                }
              ]}
              pagination={false}
            />
          </Card>
        </Col>

        {/* Thematic Plans Detail */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AppstoreOutlined style={{ color: '#1890ff' }} />
                <span>Thematic Plans & Initiatives</span>
              </div>
            }
          >
            <Tabs defaultActiveKey="1">
              {thematicPlans.map(plan => (
                <TabPane tab={plan.theme} key={plan.id}>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <Text strong>Overall Progress</Text>
                      <Tag color={getStatusColor(plan.status)}>{plan.status}</Tag>
                    </div>
                    <Progress percent={plan.progress} status={plan.status === 'on-track' ? 'active' : 'exception'} />
                  </div>
                  
                  <Table 
                    dataSource={plan.initiatives}
                    columns={[
                      {
                        title: 'Initiative',
                        dataIndex: 'name',
                        key: 'name',
                      },
                      {
                        title: 'Progress',
                        dataIndex: 'progress',
                        key: 'progress',
                        render: (progress) => (
                          <div style={{ width: 100 }}>
                            <Progress percent={progress} size="small" />
                          </div>
                        )
                      },
                      {
                        title: 'Owner',
                        dataIndex: 'owner',
                        key: 'owner',
                      },
                      {
                        title: 'Deadline',
                        dataIndex: 'deadline',
                        key: 'deadline',
                      },
                      {
                        title: 'Actions',
                        key: 'actions',
                        render: () => (
                          <Space>
                            <Button type="text" icon={<EditOutlined />} size="small" />
                            <Button type="text" icon={<DeleteOutlined />} size="small" />
                          </Space>
                        )
                      }
                    ]}
                    pagination={false}
                  />
                </TabPane>
              ))}
            </Tabs>
          </Card>
        </Col>
      </Row>

      {/* New Thematic Plan Modal */}
      <Modal
        title="Create New Thematic Plan"
        open={isThemeModalVisible}
        onCancel={() => setIsThemeModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            console.log(values);
            setIsThemeModalVisible(false);
            message.success('Thematic plan created successfully');
          }}
        >
          <Form.Item
            name="theme"
            label="Theme Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="e.g., Digital Transformation" />
          </Form.Item>

          <Form.Item
            name="budget"
            label="Budget Allocation"
            rules={[{ required: true }]}
          >
            <Input prefix="$" placeholder="1,500,000" />
          </Form.Item>

          <Form.Item
            name="directorate"
            label="Lead Directorate"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="tech">Technology</Option>
              <Option value="ops">Operations</Option>
              <Option value="sales">Sales</Option>
              <Option value="corp">Corporate</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea rows={4} placeholder="Describe the thematic plan..." />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsThemeModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Create Theme</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DirectorPage;