import React, { useState } from 'react';
import { Card, Row, Col, Typography, Progress, Table, Tag, Button, Avatar, List, Space, Tabs, Statistic, Badge, Timeline, Steps } from 'antd';
import { 
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  FileTextOutlined,
  BarChartOutlined,
  CalendarOutlined,
  FlagOutlined,
  MessageOutlined,
  BellOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const EmployeePage = () => {
  const [activeTab, setActiveTab] = useState('1');

  // Employee Info
  const employeeInfo = {
    name: 'David Kim',
    role: 'Senior Frontend Developer',
    team: 'Frontend Team',
    division: 'Product Development Division',
    directorate: 'Technology Directorate',
    joinDate: '2022-03-15',
    avatar: null
  };

  // Assigned OKRs
  const assignedOKRs = [
    {
      id: 1,
      objective: 'Deliver Customer Portal MVP',
      progress: 75,
      owner: 'Emma Watson',
      status: 'on-track',
      priority: 'high',
      dueDate: '2024-04-15',
      keyResults: [
        { id: 101, title: 'Complete UI/UX design', progress: 100, status: 'completed' },
        { id: 102, title: 'Implement dashboard components', progress: 80, status: 'on-track' },
        { id: 103, title: 'Write unit tests', progress: 45, status: 'at-risk' }
      ]
    },
    {
      id: 2,
      objective: 'Improve Frontend Performance',
      progress: 60,
      owner: 'Emma Watson',
      status: 'on-track',
      priority: 'medium',
      dueDate: '2024-05-30',
      keyResults: [
        { id: 201, title: 'Reduce bundle size by 30%', progress: 70, status: 'on-track' },
        { id: 202, title: 'Implement code splitting', progress: 65, status: 'on-track' },
        { id: 203, title: 'Optimize render performance', progress: 45, status: 'at-risk' }
      ]
    }
  ];

  // Assigned Tasks
  const assignedTasks = [
    {
      id: 1,
      title: 'Implement login page UI',
      project: 'Customer Portal',
      status: 'completed',
      priority: 'high',
      dueDate: '2024-03-10',
      assignedBy: 'Emma Watson',
      completedDate: '2024-03-09'
    },
    {
      id: 2,
      title: 'Create dashboard charts component',
      project: 'Customer Portal',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-03-20',
      assignedBy: 'Emma Watson',
      progress: 65
    },
    {
      id: 3,
      title: 'Fix responsive layout issues',
      project: 'Customer Portal',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '2024-03-18',
      assignedBy: 'Emma Watson',
      progress: 40
    },
    {
      id: 4,
      title: 'Write documentation for components',
      project: 'Customer Portal',
      status: 'pending',
      priority: 'low',
      dueDate: '2024-03-25',
      assignedBy: 'Emma Watson'
    },
    {
      id: 5,
      title: 'Code review for team members',
      project: 'Frontend Team',
      status: 'review',
      priority: 'medium',
      dueDate: '2024-03-15',
      assignedBy: 'Emma Watson',
      progress: 90
    }
  ];

  // Personal OKRs
  const personalOKRs = [
    {
      id: 1,
      objective: 'Complete React Certification',
      progress: 80,
      status: 'on-track',
      dueDate: '2024-04-30',
      keyResults: [
        { title: 'Complete online course', progress: 100, status: 'completed' },
        { title: 'Pass certification exam', progress: 60, status: 'in-progress' }
      ]
    },
    {
      id: 2,
      objective: 'Improve Code Quality',
      progress: 65,
      status: 'on-track',
      dueDate: '2024-06-30',
      keyResults: [
        { title: 'Achieve 80% test coverage', progress: 70, status: 'on-track' },
        { title: 'Fix 50 code smells', progress: 60, status: 'on-track' }
      ]
    }
  ];

  // Performance Metrics
  const performanceMetrics = {
    tasksCompleted: 28,
    tasksInProgress: 5,
    onTimeDelivery: 92,
    qualityScore: 88,
    peerFeedback: 4.5
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'in-progress': return 'processing';
      case 'pending': return 'default';
      case 'review': return 'warning';
      case 'at-risk': return 'error';
      case 'on-track': return 'success';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'blue';
    }
  };

  const taskColumns = [
    {
      title: 'Task',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{record.project}</Text>
        </Space>
      )
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
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>
          {priority}
        </Tag>
      )
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Progress',
      key: 'progress',
      render: (_, record) => (
        record.progress ? (
          <div style={{ width: 100 }}>
            <Progress percent={record.progress} size="small" />
          </div>
        ) : (
          <Tag color={record.status === 'completed' ? 'success' : 'default'}>
            {record.status}
          </Tag>
        )
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Button type="link" size="small">
          Update
        </Button>
      )
    }
  ];

  return (
    <div>
      <Row gutter={[24, 24]}>
        {/* Employee Profile Header */}
        <Col span={24}>
          <Card>
            <Row align="middle" gutter={24}>
              <Col>
                <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
              </Col>
              <Col flex="auto">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <Title level={3} style={{ margin: 0 }}>{employeeInfo.name}</Title>
                    <Space wrap style={{ marginTop: 8 }}>
                      <Tag color="blue">{employeeInfo.role}</Tag>
                      <Tag color="geekblue">{employeeInfo.team}</Tag>
                      <Tag color="purple">{employeeInfo.division}</Tag>
                      <Tag color="cyan">Joined {employeeInfo.joinDate}</Tag>
                    </Space>
                  </div>
                  <Space>
                    <Button icon={<MessageOutlined />}>Message</Button>
                    <Button type="primary" icon={<CalendarOutlined />}>Schedule</Button>
                  </Space>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Performance Stats */}
        <Col span={24}>
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Tasks Completed" 
                  value={performanceMetrics.tasksCompleted} 
                  suffix={`/ ${performanceMetrics.tasksCompleted + performanceMetrics.tasksInProgress}`}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
                <Text type="secondary">This quarter</Text>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="On-Time Delivery" 
                  value={performanceMetrics.onTimeDelivery} 
                  suffix="%"
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
                <Progress percent={performanceMetrics.onTimeDelivery} size="small" showInfo={false} style={{ marginTop: 8 }} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Quality Score" 
                  value={performanceMetrics.qualityScore} 
                  suffix="%"
                  prefix={<BarChartOutlined />}
                  valueStyle={{ color: '#faad14' }}
                />
                <Progress percent={performanceMetrics.qualityScore} size="small" showInfo={false} style={{ marginTop: 8 }} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Peer Feedback" 
                  value={performanceMetrics.peerFeedback} 
                  suffix="/ 5"
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#722ed1' }}
                />
                <div style={{ marginTop: 8 }}>
                  {[1,2,3,4,5].map(star => (
                    <span key={star} style={{ color: star <= performanceMetrics.peerFeedback ? '#faad14' : '#d9d9d9', fontSize: 16 }}>
                      ★
                    </span>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Main Content Tabs */}
        <Col span={24}>
          <Card>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab="My Tasks" key="1">
                <Table 
                  columns={taskColumns} 
                  dataSource={assignedTasks} 
                  rowKey="id"
                  pagination={false}
                />
              </TabPane>

              <TabPane tab="My OKRs" key="2">
                <Row gutter={[16, 16]}>
                  <Col span={16}>
                    <List
                      itemLayout="horizontal"
                      dataSource={assignedOKRs}
                      renderItem={okr => (
                        <List.Item>
                          <Card style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                              <div>
                                <Space>
                                  <FlagOutlined style={{ color: '#1890ff' }} />
                                  <Text strong style={{ fontSize: 16 }}>{okr.objective}</Text>
                                </Space>
                                <div style={{ marginTop: 4 }}>
                                  <Tag color={getStatusColor(okr.status)}>{okr.status}</Tag>
                                  <Tag color={getPriorityColor(okr.priority)}>{okr.priority}</Tag>
                                  <Text type="secondary">Due: {okr.dueDate}</Text>
                                </div>
                              </div>
                              <div style={{ width: 150 }}>
                                <Progress type="circle" percent={okr.progress} width={50} />
                              </div>
                            </div>
                            
                            <div style={{ paddingLeft: 24 }}>
                              <Text strong style={{ display: 'block', marginBottom: 12 }}>Key Results:</Text>
                              {okr.keyResults.map(kr => (
                                <div key={kr.id} style={{ marginBottom: 12 }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <Space>
                                      <span>{kr.title}</span>
                                      <Tag color={getStatusColor(kr.status)} size="small">{kr.status}</Tag>
                                    </Space>
                                    <span>{kr.progress}%</span>
                                  </div>
                                  <Progress percent={kr.progress} size="small" showInfo={false} />
                                </div>
                              ))}
                            </div>
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Col>
                  <Col span={8}>
                    <Card title="Personal OKRs">
                      <List
                        itemLayout="horizontal"
                        dataSource={personalOKRs}
                        renderItem={okr => (
                          <List.Item>
                            <div style={{ width: '100%' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <Text strong>{okr.objective}</Text>
                                <Tag color={getStatusColor(okr.status)}>{okr.status}</Tag>
                              </div>
                              <Progress percent={okr.progress} size="small" />
                              <Text type="secondary" style={{ fontSize: 12 }}>Due: {okr.dueDate}</Text>
                            </div>
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Project Progress" key="3">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card title="Customer Portal - Progress">
                      <div style={{ marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <Text strong>Overall Progress</Text>
                          <Text strong>75%</Text>
                        </div>
                        <Progress percent={75} status="active" />
                      </div>
                      <Timeline>
                        <Timeline.Item color="green">Design phase completed</Timeline.Item>
                        <Timeline.Item color="blue">Development in progress</Timeline.Item>
                        <Timeline.Item color="gray">Testing (pending)</Timeline.Item>
                        <Timeline.Item color="gray">Deployment (pending)</Timeline.Item>
                      </Timeline>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="My Contributions">
                      <List>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>D</Avatar>}
                            title="Implemented dashboard charts"
                            description="Completed 2 days ago · +15 points"
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar style={{ backgroundColor: '#52c41a' }}>D</Avatar>}
                            title="Fixed responsive layout issues"
                            description="In progress · 40% complete"
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar style={{ backgroundColor: '#faad14' }}>D</Avatar>}
                            title="Code review for 5 PRs"
                            description="Completed yesterday · +10 points"
                          />
                        </List.Item>
                      </List>
                    </Card>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Timeline & Activity" key="4">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Card title="Weekly Activity">
                      <Steps
                        direction="vertical"
                        size="small"
                        current={2}
                        items={[
                          { title: 'Monday', description: 'Completed login page UI, Started dashboard implementation' },
                          { title: 'Tuesday', description: 'Implemented chart components, Code review session' },
                          { title: 'Wednesday', description: 'Fixed responsive issues, Team meeting' },
                          { title: 'Thursday', description: 'Working on performance optimization' },
                          { title: 'Friday', description: 'Documentation and testing' },
                        ]}
                      />
                    </Card>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Notifications" key="5">
                <List>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Badge status="processing" />}
                      title="Task assigned"
                      description="Emma Watson assigned you 'Fix responsive layout issues'"
                    />
                    <Text type="secondary">2 hours ago</Text>
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Badge status="success" />}
                      title="Task completed"
                      description="Your PR 'Implement dashboard charts' was merged"
                    />
                    <Text type="secondary">1 day ago</Text>
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Badge status="warning" />}
                      title="Deadline approaching"
                      description="Task 'Write unit tests' is due in 2 days"
                    />
                    <Text type="secondary">2 days ago</Text>
                  </List.Item>
                </List>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeePage;