import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Progress, Table, Tag, Button, Statistic, Tabs, List, Space, Modal, Form, Input, Select, message, Timeline, Badge } from 'antd';
import { 
  RocketOutlined, 
  EyeOutlined, 
  AimOutlined,
  FlagOutlined,
  TeamOutlined,
  BarChartOutlined,
  FileTextOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  DownloadOutlined,
  SendOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  UserOutlined,
  BellOutlined
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import ApiService from '../../services/api';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const GeneralDirectorDashboard = () => {
  const { user } = useAuth();
  const [organizationalPlan, setOrganizationalPlan] = useState(null);
  const [directoratePlans, setDirectoratePlans] = useState([]);
  const [reports, setReports] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isPlanModalVisible, setIsPlanModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [selectedDirectorate, setSelectedDirectorate] = useState(null);
  const [form] = Form.useChildForm();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const plan = await ApiService.getOrganizationalPlan(2024, 'Q1');
    setOrganizationalPlan(plan);

    const directoratePlans = await ApiService.getDirectoratePlansByDirector(user.id);
    setDirectoratePlans(directoratePlans);

    const userReports = await ApiService.getReportsByUser(user.id, user.role);
    setReports(userReports);

    const userNotifications = await ApiService.getNotifications(user.id);
    setNotifications(userNotifications);
  };

  const handleCreatePlan = async (values) => {
    const newPlan = {
      year: 2024,
      quarter: 'Q1',
      ...values,
      createdBy: user.id,
      status: 'active',
      strategic_objectives: []
    };
    await ApiService.createOrganizationalPlan(newPlan);
    message.success('Organizational plan created successfully');
    setIsPlanModalVisible(false);
    loadData();
  };

  const handleRequestReport = (directorateId) => {
    setSelectedDirectorate(directorateId);
    setIsReportModalVisible(true);
  };

  const handleSubmitReportRequest = async (values) => {
    const request = {
      title: `Report Request: ${values.title}`,
      type: 'request',
      from: user.id,
      to: selectedDirectorate,
      content: values.content,
      quarter: 'Q1',
      year: 2024,
      status: 'pending'
    };
    await ApiService.submitReport(request);
    message.success('Report request sent successfully');
    setIsReportModalVisible(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'on-track': return 'success';
      case 'at-risk': return 'warning';
      case 'behind': return 'error';
      case 'completed': return 'processing';
      case 'active': return 'blue';
      default: return 'default';
    }
  };

  const directorateColumns = [
    {
      title: 'Directorate',
      dataIndex: 'directorate',
      key: 'directorate',
      render: (text) => {
        const names = { tech: 'Technology', hr: 'HR', marketing: 'Marketing', finance: 'Finance' };
        return names[text] || text;
      }
    },
    {
      title: 'Progress',
      dataIndex: 'objectives',
      key: 'progress',
      render: (objectives) => {
        const avgProgress = objectives?.reduce((acc, obj) => acc + obj.progress, 0) / (objectives?.length || 1);
        return (
          <div style={{ width: 120 }}>
            <Progress percent={Math.round(avgProgress)} size="small" />
          </div>
        );
      }
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => {
        const avgProgress = record.objectives?.reduce((acc, obj) => acc + obj.progress, 0) / (record.objectives?.length || 1);
        const status = avgProgress >= 70 ? 'on-track' : avgProgress >= 40 ? 'at-risk' : 'behind';
        return <Tag color={getStatusColor(status)}>{status}</Tag>;
      }
    },
    {
      title: 'Thematics',
      key: 'thematics',
      render: (_, record) => (
        <Space>
          {record.alignedThematics?.map(themeId => {
            const theme = organizationalPlan?.thematics.find(t => t.id === themeId);
            return theme ? <Tag key={themeId} color="blue">{theme.name}</Tag> : null;
          })}
        </Space>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<FileTextOutlined />} 
            size="small"
            onClick={() => handleRequestReport(record.directorateId)}
          >
            Request Report
          </Button>
          <Button type="link" icon={<EyeOutlined />} size="small">
            View Details
          </Button>
        </Space>
      )
    }
  ];

  const reportColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      render: (fromId) => {
        const reporter = db.users.find(u => u.id === fromId);
        return reporter?.name || 'Unknown';
      }
    },
    {
      title: 'Submitted',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'submitted' ? 'processing' : 'default'}>{status}</Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} size="small" />
          <Button type="text" icon={<DownloadOutlined />} size="small" />
        </Space>
      )
    }
  ];

  return (
    <div>
      <Row gutter={[24, 24]}>
        {/* Header */}
        <Col span={24}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Title level={2}>General Director Dashboard</Title>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar size={40} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                <div>
                  <Text strong style={{ fontSize: 16 }}>{user?.name}</Text>
                  <div>
                    <Tag color="gold">General Director</Tag>
                    <Tag color="blue">Executive Office</Tag>
                  </div>
                </div>
              </div>
            </div>
            <Space>
              <Badge count={notifications.filter(n => !n.read).length}>
                <Button icon={<BellOutlined />}>Notifications</Button>
              </Badge>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsPlanModalVisible(true)}
              >
                Create Strategic Plan
              </Button>
            </Space>
          </div>
        </Col>

        {/* Organization Overview Stats */}
        <Col span={24}>
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Overall Progress" 
                  value={organizationalPlan?.strategic_objectives?.reduce((acc, obj) => acc + obj.progress, 0) / (organizationalPlan?.strategic_objectives?.length || 1) || 0}
                  precision={1}
                  suffix="%"
                  prefix={<DashboardOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
                <Progress 
                  percent={organizationalPlan?.strategic_objectives?.reduce((acc, obj) => acc + obj.progress, 0) / (organizationalPlan?.strategic_objectives?.length || 1) || 0} 
                  size="small" 
                  showInfo={false} 
                  style={{ marginTop: 8 }} 
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Directorates" 
                  value={4} 
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
                <Text type="secondary">All active</Text>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Strategic Objectives" 
                  value={organizationalPlan?.strategic_objectives?.length || 0}
                  prefix={<AimOutlined />}
                  valueStyle={{ color: '#faad14' }}
                />
                <Text type="secondary">{organizationalPlan?.strategic_objectives?.filter(o => o.status === 'on-track').length || 0} on track</Text>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Pending Reports" 
                  value={reports.filter(r => r.status === 'submitted').length}
                  prefix={<FileTextOutlined />}
                  valueStyle={{ color: '#722ed1' }}
                />
                <Text type="secondary">Awaiting review</Text>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Mission & Vision */}
        <Col span={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <RocketOutlined style={{ color: '#1890ff' }} />
                <span>Organization Mission & Vision</span>
              </div>
            }
            style={{ height: '100%' }}
          >
            <div style={{ marginBottom: 24 }}>
              <Text strong style={{ fontSize: 16 }}>Mission</Text>
              <Paragraph style={{ marginTop: 8, fontSize: 14 }}>
                {organizationalPlan?.mission || "To revolutionize enterprise software through AI-driven solutions"}
              </Paragraph>
            </div>
            <div>
              <Text strong style={{ fontSize: 16 }}>Vision</Text>
              <Paragraph style={{ marginTop: 8, fontSize: 14 }}>
                {organizationalPlan?.vision || "To be the global leader in intelligent OKR platforms"}
              </Paragraph>
            </div>
            <div style={{ marginTop: 24 }}>
              <Text strong>Strategic Thematics</Text>
              <div style={{ marginTop: 12 }}>
                {organizationalPlan?.thematics?.map(theme => (
                  <Tag key={theme.id} color="blue" style={{ marginBottom: 8, padding: '4px 12px' }}>
                    {theme.name} - {theme.budget}
                  </Tag>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        {/* Strategic Objectives */}
        <Col span={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AimOutlined style={{ color: '#1890ff' }} />
                <span>Strategic Objectives Q1 2024</span>
              </div>
            }
            style={{ height: '100%' }}
          >
            <List
              itemLayout="horizontal"
              dataSource={organizationalPlan?.strategic_objectives || []}
              renderItem={obj => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Space>
                        <Text strong>{obj.title}</Text>
                        <Tag color={getStatusColor(obj.status)}>{obj.status}</Tag>
                        <Tag>Weight: {obj.weight}%</Tag>
                      </Space>
                    }
                    description={
                      <div style={{ marginTop: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text type="secondary">{obj.description}</Text>
                          <Text strong>{obj.progress}%</Text>
                        </div>
                        <Progress percent={obj.progress} size="small" />
                        <div style={{ marginTop: 8 }}>
                          <Tag color="geekblue">{obj.thematic}</Tag>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Directorate Performance */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TeamOutlined style={{ color: '#1890ff' }} />
                <span>Directorate Performance & Alignment</span>
              </div>
            }
            extra={
              <Button type="link" icon={<BarChartOutlined />}>
                View All
              </Button>
            }
          >
            <Table 
              columns={directorateColumns} 
              dataSource={directoratePlans} 
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>

        {/* Reports & Communications */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileTextOutlined style={{ color: '#1890ff' }} />
                <span>Directorate Reports</span>
              </div>
            }
          >
            <Table 
              columns={reportColumns} 
              dataSource={reports} 
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>

        {/* Strategic Timeline */}
        <Col span={24}>
          <Card title="Strategic Timeline">
            <Timeline mode="alternate">
              <Timeline.Item color="green">
                <Text strong>Q1 2024</Text>
                <div>AI Analytics Platform Development</div>
                <Text type="secondary">Progress: 60%</Text>
              </Timeline.Item>
              <Timeline.Item color="blue">
                <Text strong>Q2 2024</Text>
                <div>Market Expansion - APAC Region</div>
                <Text type="secondary">Planning phase</Text>
              </Timeline.Item>
              <Timeline.Item color="blue">
                <Text strong>Q3 2024</Text>
                <div>Customer Experience Enhancement</div>
                <Text type="secondary">To be started</Text>
              </Timeline.Item>
              <Timeline.Item color="orange">
                <Text strong>Q4 2024</Text>
                <div>Sustainability Certification</div>
                <Text type="secondary">Behind schedule</Text>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>

      {/* Create Strategic Plan Modal */}
      <Modal
        title="Create Strategic Plan"
        open={isPlanModalVisible}
        onCancel={() => setIsPlanModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreatePlan}
        >
          <Form.Item name="mission" label="Mission Statement" rules={[{ required: true }]}>
            <TextArea rows={3} placeholder="Enter organization mission" />
          </Form.Item>
          <Form.Item name="vision" label="Vision Statement" rules={[{ required: true }]}>
            <TextArea rows={3} placeholder="Enter organization vision" />
          </Form.Item>
          <Form.Item name="thematics" label="Strategic Thematics">
            <Select mode="tags" placeholder="Add thematic areas">
              <Option value="Market Expansion">Market Expansion</Option>
              <Option value="Digital Transformation">Digital Transformation</Option>
              <Option value="Customer Excellence">Customer Excellence</Option>
              <Option value="Sustainability">Sustainability</Option>
              <Option value="Innovation">Innovation</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsPlanModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Create Plan</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Request Report Modal */}
      <Modal
        title="Request Directorate Report"
        open={isReportModalVisible}
        onCancel={() => setIsReportModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitReportRequest}
        >
          <Form.Item name="title" label="Report Title" rules={[{ required: true }]}>
            <Input placeholder="e.g., Q1 Progress Report" />
          </Form.Item>
          <Form.Item name="content" label="Request Details" rules={[{ required: true }]}>
            <TextArea rows={4} placeholder="Specify what information you need..." />
          </Form.Item>
          <Form.Item name="deadline" label="Deadline">
            <Input type="date" />
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsReportModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Send Request</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GeneralDirectorDashboard;