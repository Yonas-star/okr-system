import React, { useState, useEffect } from 'react';
import { 
  Card, Row, Col, Typography, Progress, Table, Tag, Button, Avatar, 
  List, Space, Select, Modal, Form, Input, Dropdown, Badge, 
  Tabs, Tree, message, Statistic, Tooltip, Checkbox, Divider 
} from 'antd';
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
  DownloadOutlined,
  CopyOutlined,
  SaveOutlined,
  FolderOutlined,
  StarOutlined,
  DragOutlined,
  DashboardOutlined,
  LayoutOutlined,
  ColumnHeightOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  CalendarOutlined,
  DollarOutlined,
  FundOutlined,
  ProjectOutlined,
  ScheduleOutlined
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
  const [isBoardModalVisible, setIsBoardModalVisible] = useState(false);
  const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
  const [isComponentSelectorVisible, setIsComponentSelectorVisible] = useState(false);
  const [isSaveTemplateModalVisible, setIsSaveTemplateModalVisible] = useState(false);
  const [isEditBoardModalVisible, setIsEditBoardModalVisible] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState('main');
  const [editingBoard, setEditingBoard] = useState(null);
  const [form] = Form.useForm();
  
  // Define base data first
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

  // Team Members (base data)
  const teamMembers = [
    { id: 1, name: 'Emma Watson', role: 'Team Lead', team: 'Frontend', status: 'active', workload: 85 },
    { id: 2, name: 'James Chen', role: 'Team Lead', team: 'Backend', status: 'active', workload: 70 },
    { id: 3, name: 'Michael Brown', role: 'Team Lead', team: 'DevOps', status: 'active', workload: 60 },
    { id: 4, name: 'Sarah Johnson', role: 'Team Lead', team: 'QA', status: 'active', workload: 75 },
    { id: 5, name: 'David Kim', role: 'Senior Developer', team: 'Frontend', status: 'active', workload: 90 },
    { id: 6, name: 'Lisa Wang', role: 'Developer', team: 'Backend', status: 'active', workload: 65 },
  ];

  // Division OKRs (base data)
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

  // Division Projects (base data)
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

  // Reports (base data)
  const divisionReports = [
    { id: 1, title: 'Weekly Sprint Report', status: 'submitted', date: '2024-03-15', submittedBy: 'Emma Watson' },
    { id: 2, title: 'Monthly Progress Report', status: 'draft', date: '2024-03-20', submittedBy: 'James Chen' },
    { id: 3, title: 'Q1 OKR Review', status: 'approved', date: '2024-03-10', submittedBy: 'Alex Rivera' },
  ];

  // Boards state with different data for each board
  const [boards, setBoards] = useState([
    { 
      id: 'main', 
      name: 'Main Division Board', 
      type: 'main',
      icon: <DashboardOutlined />,
      components: ['stats', 'structure', 'permissions', 'okrs', 'team', 'reports'],
      data: {
        stats: {
          teamMembers: 29,
          totalCapacity: 35,
          activeProjects: 12,
          completedProjects: 4,
          tasks: 45,
          totalTasks: 89,
          okrProgress: 68
        },
        teams: divisionStructure,
        members: teamMembers,
        okrs: divisionOKRs,
        projects: divisionProjects,
        reports: divisionReports
      },
      isTemplate: false,
      createdAt: '2024-03-01'
    },
    { 
      id: 'projects', 
      name: 'Projects Board', 
      type: 'project',
      icon: <ProjectOutlined />,
      components: ['stats', 'projects', 'timeline', 'team'],
      data: {
        stats: {
          teamMembers: 15,
          totalCapacity: 15,
          activeProjects: 8,
          completedProjects: 3,
          tasks: 32,
          totalTasks: 45,
          okrProgress: 75
        },
        projects: [
          {
            id: 1,
            name: 'Mobile App Development',
            status: 'in-progress',
            progress: 60,
            deadline: '2024-05-15',
            team: 'Mobile Team',
            priority: 'high',
            tasks: [
              { id: 1001, title: 'UI Design', assignee: 'John', status: 'completed' },
              { id: 1002, title: 'API Integration', assignee: 'Sarah', status: 'in-progress' }
            ]
          },
          {
            id: 2,
            name: 'Web Redesign',
            status: 'in-progress',
            progress: 85,
            deadline: '2024-04-30',
            team: 'Frontend Team',
            priority: 'medium',
            tasks: [
              { id: 2001, title: 'Homepage', assignee: 'Mike', status: 'completed' },
              { id: 2002, title: 'User Dashboard', assignee: 'Emma', status: 'in-progress' }
            ]
          }
        ],
        team: [
          { id: 1, name: 'John Smith', role: 'Lead Developer', team: 'Mobile', status: 'active', workload: 90 },
          { id: 2, name: 'Sarah Lee', role: 'Developer', team: 'Mobile', status: 'active', workload: 75 },
          { id: 3, name: 'Mike Johnson', role: 'Developer', team: 'Frontend', status: 'active', workload: 60 }
        ]
      },
      isTemplate: false,
      createdAt: '2024-03-05'
    },
    { 
      id: 'hr', 
      name: 'HR & People Board', 
      type: 'hr',
      icon: <TeamOutlined />,
      components: ['stats', 'structure', 'team', 'reports'],
      data: {
        stats: {
          teamMembers: 29,
          totalCapacity: 35,
          activeProjects: 5,
          completedProjects: 2,
          tasks: 18,
          totalTasks: 25,
          okrProgress: 82
        },
        teams: {
          ...divisionStructure,
          teams: divisionStructure.teams.map(team => ({
            ...team,
            members: Math.floor(Math.random() * 5) + 5,
            openPositions: Math.floor(Math.random() * 3)
          }))
        },
        members: teamMembers.map(member => ({
          ...member,
          leaveBalance: Math.floor(Math.random() * 20) + 5,
          performance: ['Excellent', 'Good', 'Needs Improvement'][Math.floor(Math.random() * 3)]
        })),
        reports: [
          { id: 1, title: 'Monthly Attendance Report', status: 'approved', date: '2024-03-15', submittedBy: 'HR Team' },
          { id: 2, title: 'Recruitment Update', status: 'submitted', date: '2024-03-18', submittedBy: 'Talent Acquisition' },
          { id: 3, title: 'Training Completion', status: 'draft', date: '2024-03-20', submittedBy: 'L&D Team' }
        ]
      },
      isTemplate: false,
      createdAt: '2024-03-10'
    }
  ]);

  const [selectedComponents, setSelectedComponents] = useState(['stats', 'structure', 'permissions', 'okrs', 'projects', 'team', 'reports']);
  const [permissions, setPermissions] = useState({
    divisionHead: ['read', 'write', 'assign', 'approve', 'delete'],
    teamLeads: ['read', 'write', 'assign'],
    employees: ['read', 'update']
  });

  // Available Components Library
  const availableComponents = [
    {
      id: 'stats',
      name: 'Statistics Cards',
      icon: <BarChartOutlined />,
      category: 'analytics',
      description: 'Show key metrics and KPIs',
      defaultSize: 'full',
      preview: '📊 Displays division stats, progress, and metrics'
    },
    {
      id: 'structure',
      name: 'Organization Structure',
      icon: <ApartmentOutlined />,
      category: 'management',
      description: 'Visual org chart and team hierarchy',
      defaultSize: 'half',
      preview: '🏢 Shows teams, leads, and reporting structure'
    },
    {
      id: 'permissions',
      name: 'Permissions Manager',
      icon: <LockOutlined />,
      category: 'administration',
      description: 'Role-based access control',
      defaultSize: 'half',
      preview: '🔐 Manage user roles and permissions'
    },
    {
      id: 'okrs',
      name: 'OKRs & Goals',
      icon: <FlagOutlined />,
      category: 'planning',
      description: 'Track objectives and key results',
      defaultSize: 'full',
      preview: '🎯 Monitor progress towards goals'
    },
    {
      id: 'projects',
      name: 'Projects Overview',
      icon: <AppstoreOutlined />,
      category: 'project',
      description: 'View all projects and their status',
      defaultSize: 'full',
      preview: '📁 Track project progress and tasks'
    },
    {
      id: 'team',
      name: 'Team Members',
      icon: <TeamOutlined />,
      category: 'people',
      description: 'Team directory and workload',
      defaultSize: 'full',
      preview: '👥 View team members and assignments'
    },
    {
      id: 'reports',
      name: 'Reports & Communications',
      icon: <FileTextOutlined />,
      category: 'communication',
      description: 'Reports, updates, and announcements',
      defaultSize: 'full',
      preview: '📋 Submit and review reports'
    },
    {
      id: 'timeline',
      name: 'Timeline View',
      icon: <ClockCircleOutlined />,
      category: 'project',
      description: 'Gantt chart and project timeline',
      defaultSize: 'full',
      preview: '⏱️ Visualize project schedules'
    },
    {
      id: 'calendar',
      name: 'Calendar',
      icon: <CalendarOutlined />,
      category: 'scheduling',
      description: 'Events and deadlines calendar',
      defaultSize: 'half',
      preview: '📅 View upcoming dates and events'
    },
    {
      id: 'files',
      name: 'File Manager',
      icon: <FolderOutlined />,
      category: 'resources',
      description: 'Documents and resources',
      defaultSize: 'half',
      preview: '📎 Upload and manage files'
    },
    {
      id: 'budget',
      name: 'Budget Tracker',
      icon: <DollarOutlined />,
      category: 'finance',
      description: 'Track expenses and budget',
      defaultSize: 'half',
      preview: '💰 Monitor financial metrics'
    }
  ];

  // Saved Templates
  const savedTemplates = [
    {
      id: 1,
      name: 'Standard Division Board',
      description: 'Complete division management with all components',
      components: ['stats', 'structure', 'permissions', 'okrs', 'projects', 'team', 'reports'],
      usage: 24,
      category: 'management'
    },
    {
      id: 2,
      name: 'Project Tracking Board',
      description: 'Focus on project delivery and timelines',
      components: ['stats', 'projects', 'timeline', 'team'],
      usage: 18,
      category: 'project'
    },
    {
      id: 3,
      name: 'People Management Board',
      description: 'HR and team management focus',
      components: ['stats', 'structure', 'team', 'permissions', 'reports'],
      usage: 12,
      category: 'hr'
    },
    {
      id: 4,
      name: 'Executive Overview',
      description: 'High-level metrics and OKRs',
      components: ['stats', 'okrs', 'reports'],
      usage: 30,
      category: 'executive'
    }
  ];

  // Get current board data
  const currentBoard = boards.find(board => board.id === selectedBoard) || boards[0];

  // Update selected components when board changes
  useEffect(() => {
    if (currentBoard) {
      setSelectedComponents(currentBoard.components);
    }
  }, [selectedBoard]);

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

  const handleCreateBoard = (values) => {
    const newBoard = {
      id: `board-${Date.now()}`,
      name: values.boardName,
      type: values.boardType,
      icon: values.boardType === 'project' ? <ProjectOutlined /> : 
            values.boardType === 'hr' ? <TeamOutlined /> : <DashboardOutlined />,
      components: selectedComponents,
      data: {
        stats: {
          teamMembers: 0,
          totalCapacity: 0,
          activeProjects: 0,
          completedProjects: 0,
          tasks: 0,
          totalTasks: 0,
          okrProgress: 0
        },
        projects: [],
        members: [],
        reports: []
      },
      isTemplate: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBoards([...boards, newBoard]);
    setSelectedBoard(newBoard.id);
    message.success(`Board "${values.boardName}" created successfully`);
    setIsBoardModalVisible(false);
  };

  const handleEditBoard = () => {
    setEditingBoard(currentBoard);
    setSelectedComponents(currentBoard.components);
    setIsEditBoardModalVisible(true);
  };

  const handleUpdateBoard = (values) => {
    const updatedBoards = boards.map(board => 
      board.id === currentBoard.id 
        ? { 
            ...board, 
            name: values.boardName,
            type: values.boardType,
            components: selectedComponents,
            icon: values.boardType === 'project' ? <ProjectOutlined /> : 
                  values.boardType === 'hr' ? <TeamOutlined /> : <DashboardOutlined />
          }
        : board
    );
    setBoards(updatedBoards);
    message.success(`Board "${values.boardName}" updated successfully`);
    setIsEditBoardModalVisible(false);
  };

  const handleDeleteBoard = (boardId) => {
    if (boards.length <= 1) {
      message.error('Cannot delete the last board');
      return;
    }
    const updatedBoards = boards.filter(board => board.id !== boardId);
    setBoards(updatedBoards);
    setSelectedBoard(updatedBoards[0].id);
    message.success('Board deleted successfully');
  };

  const handleSaveAsTemplate = (values) => {
    const newTemplate = {
      id: savedTemplates.length + 1,
      name: values.templateName,
      description: values.description,
      components: selectedComponents,
      usage: 0,
      category: values.category
    };
    message.success(`Template "${values.templateName}" saved successfully`);
    setIsSaveTemplateModalVisible(false);
  };

  const handleLoadTemplate = (template) => {
    setSelectedComponents(template.components);
    message.success(`Template "${template.name}" loaded`);
    setIsTemplateModalVisible(false);
  };

  const toggleComponent = (componentId) => {
    setSelectedComponents(prev => 
      prev.includes(componentId) 
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  // Updated permission menu using items prop
  const permissionMenuItems = [
    { key: 'read', label: 'Read Only' },
    { key: 'write', label: 'Read & Write' },
    { key: 'assign', label: 'Assign Tasks' },
    { key: 'approve', label: 'Approve' },
    { key: 'full', label: 'Full Access' },
  ];

  // Templates dropdown menu items
  const templatesMenuItems = [
    { 
      key: 'load', 
      icon: <FolderOutlined />, 
      label: 'Load Template',
      onClick: () => setIsTemplateModalVisible(true)
    },
    { 
      key: 'save', 
      icon: <SaveOutlined />, 
      label: 'Save as Template',
      onClick: () => setIsSaveTemplateModalVisible(true)
    },
    { type: 'divider' },
    { 
      key: 'manage', 
      icon: <EditOutlined />, 
      label: 'Manage Templates' 
    },
  ];

  // Board actions menu
  const boardActionsMenu = {
    items: [
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: 'Edit Board',
        onClick: handleEditBoard
      },
      {
        key: 'duplicate',
        icon: <CopyOutlined />,
        label: 'Duplicate Board'
      },
      {
        key: 'delete',
        icon: <DeleteOutlined />,
        label: 'Delete Board',
        danger: true,
        onClick: () => handleDeleteBoard(currentBoard.id)
      }
    ]
  };

  // Render component based on selection and current board data
  const renderComponent = (componentId) => {
    const boardData = currentBoard.data;

    switch(componentId) {
      case 'stats':
        return (
          <Col span={24} key="stats">
            <Row gutter={16}>
              <Col span={6}>
                <Card>
                  <Statistic 
                    title="Team Members" 
                    value={boardData?.stats?.teamMembers || 0} 
                    prefix={<TeamOutlined />} 
                    suffix={`/ ${boardData?.stats?.totalCapacity || 0}`}
                  />
                  <Progress 
                    percent={Math.round((boardData?.stats?.teamMembers || 0) / (boardData?.stats?.totalCapacity || 1) * 100)} 
                    size="small" 
                    showInfo={false} 
                    style={{ marginTop: 8 }} 
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic 
                    title="Active Projects" 
                    value={boardData?.stats?.activeProjects || 0} 
                    prefix={<AppstoreOutlined />} 
                  />
                  <Text type="secondary">{boardData?.stats?.completedProjects || 0} completed this quarter</Text>
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic 
                    title="Tasks" 
                    value={boardData?.stats?.tasks || 0} 
                    suffix={`/ ${boardData?.stats?.totalTasks || 0}`} 
                    prefix={<CheckCircleOutlined />} 
                  />
                  <Progress 
                    percent={Math.round((boardData?.stats?.tasks || 0) / (boardData?.stats?.totalTasks || 1) * 100)} 
                    size="small" 
                    status="active" 
                    style={{ marginTop: 8 }} 
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic 
                    title="Division OKR Progress" 
                    value={boardData?.stats?.okrProgress || 0} 
                    suffix="%" 
                    prefix={<BarChartOutlined />} 
                  />
                  <Progress percent={boardData?.stats?.okrProgress || 0} size="small" status="active" style={{ marginTop: 8 }} />
                </Card>
              </Col>
            </Row>
          </Col>
        );
      case 'structure':
        return (
          <Col span={24} key="structure">
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
                      dataSource={boardData?.teams?.teams || divisionStructure.teams}
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
                            <Tag>Projects: {team.projects?.length || 0}</Tag>
                          </div>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        );
      case 'permissions':
        return (
          <Col span={24} key="permissions">
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
                      <Dropdown menu={{ items: permissionMenuItems }} trigger={['click']}>
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
                      <Dropdown menu={{ items: permissionMenuItems }} trigger={['click']}>
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
                      <Dropdown menu={{ items: permissionMenuItems }} trigger={['click']}>
                        <Button size="small">Modify Permissions</Button>
                      </Dropdown>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        );
      case 'okrs':
        return (
          <Col span={24} key="okrs">
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <BarChartOutlined style={{ color: '#1890ff' }} />
                  <span>Division OKRs & Goals</span>
                </div>
              }
              extra={
                <Button icon={<PlusOutlined />} type="primary" onClick={() => setIsTaskModalVisible(true)}>
                  Create OKR
                </Button>
              }
            >
              <Table 
                dataSource={boardData?.okrs || divisionOKRs}
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
                      {record.keyResults?.map(kr => (
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
            </Card>
          </Col>
        );
      case 'projects':
        return (
          <Col span={24} key="projects">
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <AppstoreOutlined style={{ color: '#1890ff' }} />
                  <span>Projects Overview</span>
                </div>
              }
              extra={
                <Button icon={<PlusOutlined />} type="primary" onClick={() => setIsTaskModalVisible(true)}>
                  Create Project
                </Button>
              }
            >
              <Row gutter={[16, 16]}>
                {(boardData?.projects || divisionProjects).map(project => (
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
            </Card>
          </Col>
        );
      case 'team':
        return (
          <Col span={24} key="team">
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <TeamOutlined style={{ color: '#1890ff' }} />
                  <span>Team Members</span>
                </div>
              }
              extra={
                <Button icon={<PlusOutlined />} type="primary" onClick={() => setIsAssignModalVisible(true)}>
                  Add Member
                </Button>
              }
            >
              <Table 
                dataSource={boardData?.members || boardData?.team || teamMembers}
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
                        <Button type="text" icon={<EditOutlined />} size="small">Edit</Button>
                        <Button type="text" icon={<FileTextOutlined />} size="small">Details</Button>
                      </Space>
                    )
                  }
                ]}
              />
            </Card>
          </Col>
        );
      case 'reports':
        return (
          <Col span={24} key="reports">
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FileTextOutlined style={{ color: '#1890ff' }} />
                  <span>Reports & Communications</span>
                </div>
              }
              extra={
                <Button icon={<PlusOutlined />} type="primary" onClick={() => setIsReportModalVisible(true)}>
                  New Report
                </Button>
              }
            >
              <Table 
                dataSource={boardData?.reports || divisionReports}
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
        );
      case 'timeline':
        return (
          <Col span={24} key="timeline">
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ScheduleOutlined style={{ color: '#1890ff' }} />
                  <span>Project Timeline</span>
                </div>
              }
            >
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <ScheduleOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                <Title level={4}>Timeline View Coming Soon</Title>
                <Text type="secondary">This feature will display Gantt charts and project timelines</Text>
              </div>
            </Card>
          </Col>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Board Header with Monday.com-like Controls */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
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
              {/* Board Selector with Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Select 
                  value={selectedBoard} 
                  onChange={setSelectedBoard}
                  style={{ width: 250 }}
                  dropdownRender={menu => (
                    <div>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Button 
                        type="text" 
                        icon={<PlusOutlined />} 
                        block 
                        onClick={() => setIsBoardModalVisible(true)}
                      >
                        Create New Board
                      </Button>
                    </div>
                  )}
                >
                  {boards.map(board => (
                    <Option key={board.id} value={board.id}>
                      <Space>
                        {board.icon}
                        {board.name}
                        {board.id === selectedBoard && <Tag color="blue">Current</Tag>}
                      </Space>
                    </Option>
                  ))}
                </Select>
                
                <Dropdown menu={boardActionsMenu} trigger={['click']}>
                  <Button icon={<EditOutlined />} />
                </Dropdown>
              </div>

              {/* Component Selector */}
              <Tooltip title="Add Components">
                <Button 
                  icon={<LayoutOutlined />} 
                  onClick={() => setIsComponentSelectorVisible(true)}
                >
                  Add Component
                </Button>
              </Tooltip>

              {/* Templates Dropdown */}
              <Dropdown menu={{ items: templatesMenuItems }}>
                <Button icon={<CopyOutlined />}>
                  Templates
                </Button>
              </Dropdown>

              <Button icon={<SendOutlined />} type="primary" onClick={() => setIsReportModalVisible(true)}>
                Submit Report
              </Button>
            </Space>
          </div>

          {/* Board Info Bar */}
          <Card size="small" style={{ marginBottom: 16, background: '#f5f5f5' }}>
            <Space split={<Divider type="vertical" />}>
              <Space>
                <Text type="secondary">Current Board:</Text>
                <Text strong>{currentBoard.name}</Text>
                <Tag color="blue">{currentBoard.type}</Tag>
              </Space>
              <Space>
                <Text type="secondary">Components:</Text>
                {currentBoard.components.map(compId => {
                  const comp = availableComponents.find(c => c.id === compId);
                  return comp && (
                    <Tooltip key={compId} title={comp.name}>
                      <Badge status="processing" />
                    </Tooltip>
                  );
                })}
              </Space>
              <Space>
                <Text type="secondary">Created:</Text>
                <Text>{currentBoard.createdAt}</Text>
              </Space>
            </Space>
          </Card>
        </Col>

        {/* Dynamic Board Components */}
        {selectedComponents.map(componentId => renderComponent(componentId))}
      </Row>

      {/* Create Board Modal */}
      <Modal
        title="Create New Board"
        open={isBoardModalVisible}
        onCancel={() => setIsBoardModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateBoard}
        >
          <Form.Item name="boardName" label="Board Name" rules={[{ required: true }]}>
            <Input placeholder="e.g., Q2 Project Board" />
          </Form.Item>
          <Form.Item name="boardType" label="Board Type" rules={[{ required: true }]}>
            <Select>
              <Option value="main">Main Division</Option>
              <Option value="project">Project Tracking</Option>
              <Option value="hr">HR & People</Option>
              <Option value="finance">Finance</Option>
              <Option value="custom">Custom</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Select Components">
            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
              {availableComponents.map(component => (
                <div key={component.id} style={{ marginBottom: 8 }}>
                  <Checkbox 
                    checked={selectedComponents.includes(component.id)}
                    onChange={() => toggleComponent(component.id)}
                  >
                    <Space>
                      {component.icon}
                      <span>{component.name}</span>
                      <Tag>{component.category}</Tag>
                    </Space>
                  </Checkbox>
                  <div style={{ marginLeft: 24, color: '#666', fontSize: 12 }}>
                    {component.description}
                  </div>
                </div>
              ))}
            </div>
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsBoardModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Create Board</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Board Modal */}
      <Modal
        title="Edit Board"
        open={isEditBoardModalVisible}
        onCancel={() => setIsEditBoardModalVisible(false)}
        footer={null}
        width={600}
      >
        {editingBoard && (
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              boardName: editingBoard.name,
              boardType: editingBoard.type
            }}
            onFinish={handleUpdateBoard}
          >
            <Form.Item name="boardName" label="Board Name" rules={[{ required: true }]}>
              <Input placeholder="e.g., Q2 Project Board" />
            </Form.Item>
            <Form.Item name="boardType" label="Board Type" rules={[{ required: true }]}>
              <Select>
                <Option value="main">Main Division</Option>
                <Option value="project">Project Tracking</Option>
                <Option value="hr">HR & People</Option>
                <Option value="finance">Finance</Option>
                <Option value="custom">Custom</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Select Components">
              <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                {availableComponents.map(component => (
                  <div key={component.id} style={{ marginBottom: 8 }}>
                    <Checkbox 
                      checked={selectedComponents.includes(component.id)}
                      onChange={() => toggleComponent(component.id)}
                    >
                      <Space>
                        {component.icon}
                        <span>{component.name}</span>
                        <Tag>{component.category}</Tag>
                      </Space>
                    </Checkbox>
                    <div style={{ marginLeft: 24, color: '#666', fontSize: 12 }}>
                      {component.description}
                    </div>
                  </div>
                ))}
              </div>
            </Form.Item>
            <Form.Item>
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Button onClick={() => setIsEditBoardModalVisible(false)}>Cancel</Button>
                <Button type="primary" htmlType="submit">Update Board</Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* Component Selector Modal */}
      <Modal
        title="Add Components to Board"
        open={isComponentSelectorVisible}
        onCancel={() => setIsComponentSelectorVisible(false)}
        footer={null}
        width={700}
      >
        <Row gutter={[16, 16]}>
          {availableComponents.map(component => (
            <Col span={8} key={component.id}>
              <Card 
                hoverable
                style={{ 
                  cursor: 'pointer',
                  border: selectedComponents.includes(component.id) ? '2px solid #1890ff' : '1px solid #f0f0f0'
                }}
                onClick={() => toggleComponent(component.id)}
                bodyStyle={{ padding: 12 }}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {component.icon}
                    <Text strong>{component.name}</Text>
                  </div>
                  <Tag color="blue">{component.category}</Tag>
                  <Text type="secondary" style={{ fontSize: 12 }}>{component.description}</Text>
                  {selectedComponents.includes(component.id) && (
                    <Tag color="success" style={{ marginTop: 8 }}>Added to board</Tag>
                  )}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <Button type="primary" onClick={() => setIsComponentSelectorVisible(false)}>
            Done
          </Button>
        </div>
      </Modal>

      {/* Load Template Modal */}
      <Modal
        title="Load Board Template"
        open={isTemplateModalVisible}
        onCancel={() => setIsTemplateModalVisible(false)}
        footer={null}
        width={600}
      >
        <List
          itemLayout="horizontal"
          dataSource={savedTemplates}
          renderItem={template => (
            <List.Item
              actions={[
                <Button 
                  type="primary" 
                  size="small"
                  onClick={() => handleLoadTemplate(template)}
                >
                  Use Template
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<StarOutlined />} style={{ backgroundColor: '#faad14' }} />}
                title={template.name}
                description={
                  <div>
                    <Text type="secondary">{template.description}</Text>
                    <div style={{ marginTop: 4 }}>
                      <Tag>{template.category}</Tag>
                      <Tag>Used {template.usage} times</Tag>
                    </div>
                    <div>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Components: {template.components.length} items
                      </Text>
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Modal>

      {/* Save as Template Modal */}
      <Modal
        title="Save Current Board as Template"
        open={isSaveTemplateModalVisible}
        onCancel={() => setIsSaveTemplateModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveAsTemplate}
        >
          <Form.Item name="templateName" label="Template Name" rules={[{ required: true }]}>
            <Input placeholder="e.g., Q2 Division Template" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Describe what this template is for..." />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select>
              <Option value="management">Division Management</Option>
              <Option value="project">Project Tracking</Option>
              <Option value="hr">HR & People</Option>
              <Option value="executive">Executive Overview</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Included Components">
            <div>
              {selectedComponents.map(id => {
                const component = availableComponents.find(c => c.id === id);
                return component && (
                  <Tag key={id} color="blue" style={{ marginBottom: 4 }}>
                    {component.icon} {component.name}
                  </Tag>
                );
              })}
            </div>
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsSaveTemplateModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Save Template</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Create Task/OKR Modal */}
      <Modal
        title="Create New Task/OKR"
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
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select>
              <Option value="task">Task</Option>
              <Option value="okr">OKR</Option>
              <Option value="project">Project</Option>
            </Select>
          </Form.Item>
          <Form.Item name="assignee" label="Assign To">
            <Select>
              <Option value="emma">Emma Watson</Option>
              <Option value="james">James Chen</Option>
              <Option value="david">David Kim</Option>
              <Option value="lisa">Lisa Wang</Option>
            </Select>
          </Form.Item>
          <Form.Item name="priority" label="Priority">
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
              <Button type="primary" htmlType="submit">Create</Button>
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