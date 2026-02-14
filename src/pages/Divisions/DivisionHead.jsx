import React, { useState } from 'react';
import { Card, Row, Col, Typography, Progress, Table, Tag, Button, Avatar, List, Space, Select, Modal, Form, Input, Dropdown, Menu, Badge, Tabs, Tree, message, Statistic } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  FlagOutlined,
  SendOutlined,
  FileTextOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
  LockOutlined,
  UnlockOutlined,
  EyeOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import KanbanBoard from '../../components/KanbanBoard';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TreeNode } = Tree;

const DivisionHead = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [permissions, setPermissions] = useState({
    divisionHead: ['read', 'write', 'assign', 'approve', 'delete'],
    teamLeads: ['read', 'write', 'assign'],
    employees: ['read', 'update']
  });

  // Division Structure
  const divisionStructure = {
    id: 1,
    name: 'Product Development Division',
    head: 'Alex Rivera',
    directorate: 'Technology Directorate',
    teams: [
      {
        id: 101,
        name: 'Frontend Team',
        lead: 'Emma Watson',
        members: 8,
        projects: ['Customer Portal', 'Analytics Dashboard']
      },
      {
        id: 102,
        name: 'Backend Team',
        lead: 'James Chen',
        members: 10,
        projects: ['API Gateway', 'Database Optimization']
      },
      {
        id: 103,
        name: 'DevOps Team',
        lead: 'Michael Brown',
        members: 6,
        projects: ['CI/CD Pipeline', 'Cloud Migration']
      },
      {
        id: 104,
        name: 'QA Team',
        lead: 'Sarah Johnson',
        members: 5,
        projects: ['Automated Testing', 'Performance Testing']
      }
    ]
  };

  // Team Members
  const teamMembers = [
    { id: 1, name: 'Emma Watson', role: 'Team Lead', team: 'Frontend', status: 'active', workload: 85 },
    { id: 2, name: 'James Chen', role: 'Team Lead', team: 'Backend', status: 'active', workload: 70 },
    { id: 3, name: 'Michael Brown', role: 'Team Lead', team: 'DevOps', status: 'active', workload: 60 },
    { id: 4, name: 'Sarah Johnson', role: 'Team Lead', team: 'QA', status: 'active', workload: 75 },
    { id: 5, name: 'David Kim', role: 'Senior Developer', team: 'Frontend', status: 'active', workload: 90 },
    { id: 6, name: 'Lisa Wang', role: 'Developer', team: 'Backend', status: 'active', workload: 65 },
  ];

  // Division OKRs
  const divisionOKRs = [
    {
      id: 1,
      objective: "Deliver Customer Portal MVP",
      progress: 75,
      owner: "Emma Watson",
      status: "on-track",
      priority: "high",
      keyResults: [
        { id: 101, title: "Complete UI/UX design", progress: 100, status: "completed", assignee: "Emma" },
        { id: 102, title: "Implement API integrations", progress: 80, status: "on-track", assignee: "James" },
        { id: 103, title: "Conduct user testing", progress: 45, status: "at-risk", assignee: "Sarah" }
      ]
    },
    {
      id: 2,
      objective: "Improve System Performance",
      progress: 60,
      owner: "James Chen",
      status: "at-risk",
      priority: "high",
      keyResults: [
        { id: 201, title: "Reduce API latency by 40%", progress: 55, status: "at-risk", assignee: "James" },
        { id: 202, title: "Implement caching strategy", progress: 70, status: "on-track", assignee: "Michael" },
        { id: 203, title: "Optimize database queries", progress: 55, status: "at-risk", assignee: "Lisa" }
      ]
    }
  ];

  // Division Projects
  const divisionProjects = [
    {
      id: 1,
      name: 'Customer Portal',
      status: 'in-progress',
      progress: 75,
      deadline: '2024-04-15',
      team: 'Frontend',
      priority: 'high',
      tasks: [
        { id: 1001, title: 'Design login page', assignee: 'David', status: 'completed' },
        { id: 1002, title: 'Implement dashboard', assignee: 'Emma', status: 'in-progress' },
        { id: 1003, title: 'API integration', assignee: 'James', status: 'in-progress' }
      ]
    },
    {
      id: 2,
      name: 'API Gateway',
      status: 'in-progress',
      progress: 45,
      deadline: '2024-05-30',
      team: 'Backend',
      priority: 'high',
      tasks: [
        { id: 2001, title: 'Rate limiting', assignee: 'James', status: 'completed' },
        { id: 2002, title: 'Authentication', assignee: 'Lisa', status: 'in-progress' }
      ]
    }
  ];

  // Reports
  const divisionReports = [
    { id: 1, title: 'Weekly Sprint Report', status: 'submitted', date: '2024-03-15', submittedBy: 'Emma Watson' },
    { id: 2, title: 'Monthly Progress Report', status: 'draft', date: '2024-03-20', submittedBy: 'James Chen' },
    { id: 3, title: 'Q1 OKR Review', status: 'approved', date: '2024-03-10', submittedBy: 'Alex Rivera' },
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
      case 'in-progress': return 'processing';
      case 'pending': return 'default';
      case 'review': return 'warning';
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

  const handleAssignTask = (values) => {
    message.success(`Task assigned to ${values.assignee}`);
    setIsAssignModalVisible(false);
  };

  const handleSubmitReport = (values) => {
    message.success('Report submitted successfully');
    setIsReportModalVisible(false);
  };

  const permissionMenu = (
    <Menu>
      <Menu.Item key="read">Read Only</Menu.Item>
      <Menu.Item key="write">Read & Write</Menu.Item>
      <Menu.Item key="assign">Assign Tasks</Menu.Item>
      <Menu.Item key="approve">Approve</Menu.Item>
      <Menu.Item key="full">Full Access</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Row gutter={[24, 24]}>
        {/* Header */}
        <Col span={24}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Title level={2}>Division Head Dashboard</Title>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar size={40} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                <div>
                  <Text strong style={{ fontSize: 16 }}>Alex Rivera</Text>
                  <div>
                    <Tag color="blue">Product Development Division</Tag>
                    <Tag color="green">Technology Directorate</Tag>
                  </div>
                </div>
              </div>
            </div>
            <Space>
              <Button icon={<SendOutlined />} type="primary" onClick={() => setIsReportModalVisible(true)}>
                Submit Report
              </Button>
            </Space>
          </div>
        </Col>

        {/* Division Stats */}
        <Col span={24}>
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Team Members" 
                  value={29} 
                  prefix={<TeamOutlined />} 
                  suffix="/ 35"
                />
                <Progress percent={83} size="small" showInfo={false} style={{ marginTop: 8 }} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Active Projects" 
                  value={12} 
                  prefix={<AppstoreOutlined />} 
                />
                <Text type="secondary">4 completed this quarter</Text>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Tasks" 
                  value={45} 
                  suffix="/ 89" 
                  prefix={<CheckCircleOutlined />} 
                />
                <Progress percent={51} size="small" status="active" style={{ marginTop: 8 }} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Division OKR Progress" 
                  value={68} 
                  suffix="%" 
                  prefix={<BarChartOutlined />} 
                />
                <Progress percent={68} size="small" status="active" style={{ marginTop: 8 }} />
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Organization Structure Management */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ApartmentOutlined style={{ color: '#1890ff' }} />
                <span>Division Structure Management</span>
              </div>
            }
            extra={
              <Space>
                <Button icon={<PlusOutlined />} type="primary" size="small">
                  Add Team
                </Button>
                <Button icon={<EditOutlined />} size="small">
                  Edit Structure
                </Button>
              </Space>
            }
          >
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Card size="small" title="Organizational Chart">
                  <Tree
                    showLine
                    defaultExpandedKeys={['1', '2']}
                  >
                    <TreeNode title="Technology Directorate" key="1">
                      <TreeNode title="Product Development Division" key="2">
                        <TreeNode title="Frontend Team (8 members)" key="3">
                          <TreeNode title="Team Lead: Emma Watson" key="4" />
                          <TreeNode title="Senior Developers (3)" key="5" />
                          <TreeNode title="Developers (4)" key="6" />
                        </TreeNode>
                        <TreeNode title="Backend Team (10 members)" key="7">
                          <TreeNode title="Team Lead: James Chen" key="8" />
                          <TreeNode title="Senior Developers (4)" key="9" />
                          <TreeNode title="Developers (5)" key="10" />
                        </TreeNode>
                        <TreeNode title="DevOps Team (6 members)" key="11" />
                        <TreeNode title="QA Team (5 members)" key="12" />
                      </TreeNode>
                    </TreeNode>
                  </Tree>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="Teams & Workload">
                  <List
                    itemLayout="horizontal"
                    dataSource={divisionStructure.teams}
                    renderItem={team => (
                      <List.Item
                        actions={[
                          <Button type="text" icon={<EditOutlined />} size="small" />,
                          <Button type="text" icon={<DeleteOutlined />} size="small" danger />
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar icon={<TeamOutlined />} style={{ backgroundColor: '#1890ff' }} />}
                          title={team.name}
                          description={`Lead: ${team.lead} · ${team.members} members`}
                        />
                        <div>
                          <Tag>Projects: {team.projects.length}</Tag>
                        </div>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Permissions Management */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <LockOutlined style={{ color: '#1890ff' }} />
                <span>Structure Permissions</span>
              </div>
            }
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card size="small" style={{ background: '#f0f5ff' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text strong>Division Head</Text>
                      <Tag color="blue">Level 3</Tag>
                    </div>
                    <div>
                      {permissions.divisionHead.map(perm => (
                        <Tag key={perm} color="processing">{perm}</Tag>
                      ))}
                    </div>
                    <Dropdown overlay={permissionMenu} trigger={['click']}>
                      <Button size="small">Modify Permissions</Button>
                    </Dropdown>
                  </Space>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" style={{ background: '#f6ffed' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text strong>Team Leads</Text>
                      <Tag color="green">Level 2</Tag>
                    </div>
                    <div>
                      {permissions.teamLeads.map(perm => (
                        <Tag key={perm} color="success">{perm}</Tag>
                      ))}
                    </div>
                    <Dropdown overlay={permissionMenu} trigger={['click']}>
                      <Button size="small">Modify Permissions</Button>
                    </Dropdown>
                  </Space>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" style={{ background: '#fff7e6' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text strong>Employees</Text>
                      <Tag color="orange">Level 1</Tag>
                    </div>
                    <div>
                      {permissions.employees.map(perm => (
                        <Tag key={perm} color="warning">{perm}</Tag>
                      ))}
                    </div>
                    <Dropdown overlay={permissionMenu} trigger={['click']}>
                      <Button size="small">Modify Permissions</Button>
                    </Dropdown>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Division OKRs & Projects */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BarChartOutlined style={{ color: '#1890ff' }} />
                <span>Division OKRs & Projects</span>
              </div>
            }
            extra={
              <Button icon={<PlusOutlined />} type="primary" onClick={() => setIsTaskModalVisible(true)}>
                Create Task
              </Button>
            }
          >
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab="OKRs" key="1">
                <Table 
                  dataSource={divisionOKRs}
                  columns={[
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
                      )
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
                        <Tag color={getStatusColor(status)}>{status}</Tag>
                      )
                    },
                    {
                      title: 'Priority',
                      dataIndex: 'priority',
                      key: 'priority',
                      render: (priority) => (
                        <Tag color={getPriorityColor(priority)}>{priority}</Tag>
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
                  expandable={{
                    expandedRowRender: (record) => (
                      <div style={{ paddingLeft: 32 }}>
                        {record.keyResults.map(kr => (
                          <div key={kr.id} style={{ marginBottom: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                              <Space>
                                <span style={{ fontWeight: 500 }}>{kr.title}</span>
                                <Tag color={getStatusColor(kr.status)}>{kr.status}</Tag>
                              </Space>
                              <Tag color="blue">{kr.assignee}</Tag>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <Progress percent={kr.progress} size="small" style={{ flex: 1 }} />
                              <span>{kr.progress}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  }}
                />
              </TabPane>
              <TabPane tab="Projects" key="2">
                <Row gutter={[16, 16]}>
                  {divisionProjects.map(project => (
                    <Col span={12} key={project.id}>
                      <Card 
                        hoverable 
                        size="small"
                        title={project.name}
                        extra={<Tag color={getPriorityColor(project.priority)}>{project.priority}</Tag>}
                      >
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress percent={project.progress} size="small" />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <Text type="secondary">Team: {project.team}</Text>
                          <Text type="secondary">Due: {project.deadline}</Text>
                        </div>
                        <div>
                          <Text strong>Tasks:</Text>
                          <List
                            size="small"
                            dataSource={project.tasks}
                            renderItem={task => (
                              <List.Item>
                                <Space>
                                  <CheckCircleOutlined style={{ color: task.status === 'completed' ? '#52c41a' : '#d9d9d9' }} />
                                  <span>{task.title}</span>
                                  <Tag size="small">{task.assignee}</Tag>
                                </Space>
                              </List.Item>
                            )}
                          />
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </TabPane>
              <TabPane tab="Kanban Board" key="3">
                <KanbanBoard />
              </TabPane>
            </Tabs>
          </Card>
        </Col>

        {/* Team Members & Assignments */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TeamOutlined style={{ color: '#1890ff' }} />
                <span>Team Members & Task Assignment</span>
              </div>
            }
            extra={
              <Button icon={<PlusOutlined />} type="primary" onClick={() => setIsAssignModalVisible(true)}>
                Assign Task
              </Button>
            }
          >
            <Table 
              dataSource={teamMembers}
              columns={[
                {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                  render: (name, record) => (
                    <Space>
                      <Avatar icon={<UserOutlined />} />
                      <div>
                        <div>{name}</div>
                        <Text type="secondary" style={{ fontSize: 12 }}>{record.role}</Text>
                      </div>
                    </Space>
                  )
                },
                {
                  title: 'Team',
                  dataIndex: 'team',
                  key: 'team',
                },
                {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status) => (
                    <Badge status={status === 'active' ? 'success' : 'default'} text={status} />
                  )
                },
                {
                  title: 'Workload',
                  dataIndex: 'workload',
                  key: 'workload',
                  render: (workload) => (
                    <div style={{ width: 100 }}>
                      <Progress percent={workload} size="small" status={workload > 80 ? 'exception' : 'active'} />
                    </div>
                  )
                },
                {
                  title: 'Actions',
                  key: 'actions',
                  render: () => (
                    <Space>
                      <Button type="text" icon={<EditOutlined />} size="small">Assign</Button>
                      <Button type="text" icon={<FileTextOutlined />} size="small">Tasks</Button>
                    </Space>
                  )
                }
              ]}
            />
          </Card>
        </Col>

        {/* Reports & Communications */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileTextOutlined style={{ color: '#1890ff' }} />
                <span>Reports & Communications</span>
              </div>
            }
          >
            <Table 
              dataSource={divisionReports}
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
                    <Tag color={getStatusColor(status)}>{status}</Tag>
                  )
                },
                {
                  title: 'Date',
                  dataIndex: 'date',
                  key: 'date',
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
                        <>
                          <Button type="text" icon={<EditOutlined />} size="small" />
                          <Button type="text" icon={<SendOutlined />} size="small">Submit</Button>
                        </>
                      )}
                      <Button type="text" icon={<DownloadOutlined />} size="small" />
                    </Space>
                  )
                }
              ]}
            />
          </Card>
        </Col>
      </Row>

      {/* Create Task Modal */}
      <Modal
        title="Create New Task"
        open={isTaskModalVisible}
        onCancel={() => setIsTaskModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            message.success('Task created successfully');
            setIsTaskModalVisible(false);
          }}
        >
          <Form.Item name="title" label="Task Title" rules={[{ required: true }]}>
            <Input placeholder="Enter task title" />
          </Form.Item>
          <Form.Item name="project" label="Project" rules={[{ required: true }]}>
            <Select>
              <Option value="portal">Customer Portal</Option>
              <Option value="api">API Gateway</Option>
              <Option value="db">Database Optimization</Option>
            </Select>
          </Form.Item>
          <Form.Item name="assignee" label="Assign To" rules={[{ required: true }]}>
            <Select>
              <Option value="emma">Emma Watson</Option>
              <Option value="james">James Chen</Option>
              <Option value="david">David Kim</Option>
              <Option value="lisa">Lisa Wang</Option>
            </Select>
          </Form.Item>
          <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
            <Select>
              <Option value="high">High</Option>
              <Option value="medium">Medium</Option>
              <Option value="low">Low</Option>
            </Select>
          </Form.Item>
          <Form.Item name="deadline" label="Deadline">
            <Input type="date" />
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsTaskModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Create Task</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Assign Task Modal */}
      <Modal
        title="Assign Task"
        open={isAssignModalVisible}
        onCancel={() => setIsAssignModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAssignTask}
        >
          <Form.Item name="task" label="Select Task" rules={[{ required: true }]}>
            <Select>
              <Option value="task1">Implement login page</Option>
              <Option value="task2">API rate limiting</Option>
              <Option value="task3">Database indexing</Option>
            </Select>
          </Form.Item>
          <Form.Item name="assignee" label="Assign To" rules={[{ required: true }]}>
            <Select>
              <Option value="emma">Emma Watson</Option>
              <Option value="james">James Chen</Option>
              <Option value="david">David Kim</Option>
              <Option value="lisa">Lisa Wang</Option>
            </Select>
          </Form.Item>
          <Form.Item name="dueDate" label="Due Date">
            <Input type="date" />
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsAssignModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Assign</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Submit Report Modal */}
      <Modal
        title="Submit Report"
        open={isReportModalVisible}
        onCancel={() => setIsReportModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitReport}
        >
          <Form.Item name="reportType" label="Report Type" rules={[{ required: true }]}>
            <Select>
              <Option value="weekly">Weekly Sprint Report</Option>
              <Option value="monthly">Monthly Progress Report</Option>
              <Option value="quarterly">Quarterly OKR Review</Option>
              <Option value="project">Project Status Report</Option>
            </Select>
          </Form.Item>
          <Form.Item name="title" label="Report Title" rules={[{ required: true }]}>
            <Input placeholder="Enter report title" />
          </Form.Item>
          <Form.Item name="content" label="Report Content" rules={[{ required: true }]}>
            <Input.TextArea rows={6} placeholder="Write your report..." />
          </Form.Item>
          <Form.Item name="attachments" label="Attachments">
            <Input placeholder="Add file links" />
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsReportModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Submit Report</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DivisionHead;