import React, { useState, useEffect } from 'react';
import { 
  Card, Row, Col, Typography, Progress, Table, Tag, Button, Avatar, 
  List, Space, Select, Modal, Form, Input, Dropdown, Badge, 
  Tabs, Tree, message, Statistic, Tooltip, Checkbox, Divider, 
  DatePicker, Upload, Switch, Timeline,
  Calendar, Collapse, Descriptions, Popconfirm
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
  EyeOutlined,
  DownloadOutlined,
  CopyOutlined,
  SaveOutlined,
  FolderOutlined,
  StarOutlined,
  DragOutlined,
  DashboardOutlined,
  LayoutOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  CalendarOutlined,
  DollarOutlined,
  ProjectOutlined,
  ScheduleOutlined,
  PaperClipOutlined,
  CheckSquareOutlined,
  HolderOutlined,
  ThunderboltOutlined,
  ReloadOutlined,
  ExportOutlined
} from '@ant-design/icons';
import KanbanBoard from '../../components/KanbanBoard';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TreeNode } = Tree;
const { TextArea } = Input;
const { Panel } = Collapse;

const DivisionHead = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [activeView, setActiveView] = useState('table');
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isBoardModalVisible, setIsBoardModalVisible] = useState(false);
  const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
  const [isComponentSelectorVisible, setIsComponentSelectorVisible] = useState(false);
  const [isSaveTemplateModalVisible, setIsSaveTemplateModalVisible] = useState(false);
  const [isEditBoardModalVisible, setIsEditBoardModalVisible] = useState(false);
  const [isTaskDetailModalVisible, setIsTaskDetailModalVisible] = useState(false);
  const [isAutomationModalVisible, setIsAutomationModalVisible] = useState(false);
  const [isAutomationEditModalVisible, setIsAutomationEditModalVisible] = useState(false);
  const [isChecklistModalVisible, setIsChecklistModalVisible] = useState(false);
  const [isSubTaskModalVisible, setIsSubTaskModalVisible] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState('main');
  const [editingBoard, setEditingBoard] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedAutomation, setSelectedAutomation] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editingSubTask, setEditingSubTask] = useState(null);
  const [editingChecklistItem, setEditingChecklistItem] = useState(null);
  const [form] = Form.useForm();
  const [taskForm] = Form.useForm();
  const [automationForm] = Form.useForm();
  const [checklistForm] = Form.useForm();
  const [subTaskForm] = Form.useForm();

  // Define all base data first
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

  // Enhanced Task/Item structure with Monday.com-like columns
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design Customer Portal Dashboard",
      status: "in-progress",
      statusColor: "processing",
      priority: "high",
      priorityColor: "red",
      assignees: ["Emma Watson", "David Kim"],
      team: "Frontend",
      dueDate: "2024-04-15",
      startDate: "2024-03-01",
      estimatedHours: 40,
      actualHours: 28,
      description: "Create a modern, responsive dashboard for customer portal with real-time analytics",
      longDescription: "The dashboard should include:\n- Key metrics cards\n- Activity timeline\n- Recent orders\n- Customer satisfaction score\n- Performance charts",
      tags: ["UI/UX", "Dashboard", "Customer-facing"],
      attachments: [
        { id: 1, name: "dashboard-design.fig", url: "#", size: "2.4 MB" },
        { id: 2, name: "requirements.pdf", url: "#", size: "1.1 MB" }
      ],
      links: [
        { id: 1, name: "Figma Design", url: "https://figma.com/..." },
        { id: 2, name: "Jira Epic", url: "https://jira.com/..." }
      ],
      checklist: [
        { id: 1, text: "Design wireframes", completed: true },
        { id: 2, text: "Create high-fidelity mockups", completed: true },
        { id: 3, text: "Get stakeholder approval", completed: false },
        { id: 4, text: "Create style guide", completed: false }
      ],
      subTasks: [
        {
          id: 101,
          title: "Design login page",
          status: "completed",
          assignee: "David Kim",
          dueDate: "2024-03-10",
          priority: "high"
        },
        {
          id: 102,
          title: "Create dashboard wireframes",
          status: "in-progress",
          assignee: "Emma Watson",
          dueDate: "2024-03-20",
          priority: "medium"
        },
        {
          id: 103,
          title: "Design analytics widgets",
          status: "todo",
          assignee: "Lisa Wang",
          dueDate: "2024-03-25",
          priority: "low"
        }
      ],
      comments: [
        { id: 1, user: "Emma Watson", text: "Started working on wireframes", timestamp: "2024-03-15 10:30" },
        { id: 2, user: "Alex Rivera", text: "Please prioritize the dashboard first", timestamp: "2024-03-16 09:15" }
      ],
      dependencies: [2, 3],
      blockedBy: [],
      timeTracking: [
        { id: 1, date: "2024-03-15", hours: 4, description: "Wireframing" },
        { id: 2, date: "2024-03-16", hours: 6, description: "Mockups" }
      ],
      customFields: {
        "client": "Internal",
        "sprint": "Sprint 12",
        "storyPoints": 8
      },
      createdAt: "2024-03-01",
      updatedAt: "2024-03-16"
    },
    {
      id: 2,
      title: "Implement API Rate Limiting",
      status: "todo",
      statusColor: "default",
      priority: "high",
      priorityColor: "red",
      assignees: ["James Chen"],
      team: "Backend",
      dueDate: "2024-04-30",
      startDate: "2024-04-01",
      estimatedHours: 24,
      actualHours: 0,
      description: "Implement rate limiting for API endpoints to prevent abuse",
      longDescription: "Requirements:\n- 100 requests per minute per API key\n- 1000 requests per day per user\n- Custom limits for premium customers\n- Rate limit headers in responses",
      tags: ["Backend", "Security", "API"],
      attachments: [],
      links: [],
      checklist: [
        { id: 1, text: "Design rate limiting algorithm", completed: false },
        { id: 2, text: "Implement Redis storage", completed: false },
        { id: 3, text: "Add rate limit headers", completed: false },
        { id: 4, text: "Write tests", completed: false }
      ],
      subTasks: [
        {
          id: 201,
          title: "Research rate limiting strategies",
          status: "completed",
          assignee: "James Chen",
          dueDate: "2024-04-05",
          priority: "medium"
        }
      ],
      comments: [],
      dependencies: [],
      blockedBy: [1],
      timeTracking: [],
      customFields: {
        "client": "Internal",
        "sprint": "Sprint 13",
        "storyPoints": 5
      },
      createdAt: "2024-03-05",
      updatedAt: "2024-03-05"
    },
    {
      id: 3,
      title: "Fix Production Bug #2345",
      status: "review",
      statusColor: "warning",
      priority: "urgent",
      priorityColor: "purple",
      assignees: ["Michael Brown", "Sarah Johnson"],
      team: "DevOps",
      dueDate: "2024-03-18",
      startDate: "2024-03-17",
      estimatedHours: 8,
      actualHours: 6,
      description: "Critical bug causing database connection pool exhaustion",
      longDescription: "Issue: Database connections not being released properly after queries.\nImpact: Service degradation every 2 hours.\nFix: Implement connection pool validation and proper release in error cases.",
      tags: ["Bug", "Critical", "Database"],
      attachments: [
        { id: 3, name: "error-logs.txt", url: "#", size: "0.5 MB" }
      ],
      links: [
        { id: 3, name: "Bug Report", url: "https://jira.com/bug-2345" }
      ],
      checklist: [
        { id: 1, text: "Reproduce issue locally", completed: true },
        { id: 2, text: "Identify root cause", completed: true },
        { id: 3, text: "Implement fix", completed: false },
        { id: 4, text: "Deploy to staging", completed: false },
        { id: 5, text: "Test in production", completed: false }
      ],
      subTasks: [
        {
          id: 301,
          title: "Create database backup",
          status: "completed",
          assignee: "Michael Brown",
          dueDate: "2024-03-17",
          priority: "urgent"
        },
        {
          id: 302,
          title: "Deploy hotfix",
          status: "todo",
          assignee: "Michael Brown",
          dueDate: "2024-03-18",
          priority: "urgent"
        }
      ],
      comments: [
        { id: 3, user: "Sarah Johnson", text: "Found the issue - connection not closed in error handler", timestamp: "2024-03-17 14:20" }
      ],
      dependencies: [],
      blockedBy: [],
      timeTracking: [
        { id: 3, date: "2024-03-17", hours: 4, description: "Debugging" },
        { id: 4, date: "2024-03-17", hours: 2, description: "Fix implementation" }
      ],
      customFields: {
        "severity": "Critical",
        "environment": "Production",
        "storyPoints": 3
      },
      createdAt: "2024-03-17",
      updatedAt: "2024-03-17"
    }
  ]);

  // Automations configuration
  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: "Notify Manager on High Priority Tasks",
      trigger: "task.created",
      condition: "priority = high",
      action: "notify.manager",
      active: true,
      createdAt: "2024-03-01"
    },
    {
      id: 2,
      name: "Move to Done and Notify",
      trigger: "status.changed",
      condition: "status = completed",
      action: "move.to.done.and.notify",
      active: true,
      createdAt: "2024-03-01"
    },
    {
      id: 3,
      name: "Due Date Reminder",
      trigger: "due.date.approaching",
      condition: "dueDate in 2 days",
      action: "send.reminder",
      active: true,
      createdAt: "2024-03-01"
    }
  ]);

  // Boards state with different data for each board
  const [boards, setBoards] = useState([
    { 
      id: 'main', 
      name: 'Main Division Board', 
      type: 'main',
      icon: <DashboardOutlined />,
      components: ['stats', 'structure', 'permissions', 'okrs', 'team', 'reports', 'tasks', 'automations'],
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
        reports: divisionReports,
        tasks: tasks
      },
      isTemplate: false,
      createdAt: '2024-03-01',
      updatedAt: '2024-03-01'
    },
    { 
      id: 'projects', 
      name: 'Projects Board', 
      type: 'project',
      icon: <ProjectOutlined />,
      components: ['stats', 'projects', 'timeline', 'team', 'tasks'],
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
        ],
        tasks: tasks.filter(t => t.team === 'Frontend' || t.team === 'Mobile')
      },
      isTemplate: false,
      createdAt: '2024-03-05',
      updatedAt: '2024-03-05'
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
      createdAt: '2024-03-10',
      updatedAt: '2024-03-10'
    }
  ]);

  const [selectedComponents, setSelectedComponents] = useState(['stats', 'structure', 'permissions', 'okrs', 'projects', 'team', 'reports', 'tasks']);
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
    },
    {
      id: 'tasks',
      name: 'Task Management',
      icon: <CheckSquareOutlined />,
      category: 'project',
      description: 'Manage tasks with columns and sub-tasks',
      defaultSize: 'full',
      preview: '✅ Track tasks with custom columns'
    },
    {
      id: 'automations',
      name: 'Automations',
      icon: <ThunderboltOutlined />,
      category: 'automation',
      description: 'Automate workflows and notifications',
      defaultSize: 'full',
      preview: '⚡ Set up triggers and actions'
    }
  ];

  // Saved Templates
  const [savedTemplates, setSavedTemplates] = useState([
    {
      id: 1,
      name: 'Standard Division Board',
      description: 'Complete division management with all components',
      components: ['stats', 'structure', 'permissions', 'okrs', 'projects', 'team', 'reports', 'tasks'],
      usage: 24,
      category: 'management',
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'Project Tracking Board',
      description: 'Focus on project delivery and timelines',
      components: ['stats', 'projects', 'timeline', 'team', 'tasks'],
      usage: 18,
      category: 'project',
      createdAt: '2024-01-15'
    },
    {
      id: 3,
      name: 'People Management Board',
      description: 'HR and team management focus',
      components: ['stats', 'structure', 'team', 'permissions', 'reports'],
      usage: 12,
      category: 'hr',
      createdAt: '2024-02-01'
    },
    {
      id: 4,
      name: 'Executive Overview',
      description: 'High-level metrics and OKRs',
      components: ['stats', 'okrs', 'reports'],
      usage: 30,
      category: 'executive',
      createdAt: '2024-02-15'
    }
  ]);

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
      case 'todo': return 'default';
      case 'blocked': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      case 'urgent': return 'purple';
      default: return 'blue';
    }
  };

  // Task CRUD Operations
  const handleCreateTask = (values) => {
    const newTask = {
      id: Math.max(...tasks.map(t => t.id), 0) + 1,
      ...values,
      status: values.status || 'todo',
      priority: values.priority || 'medium',
      assignees: values.assignees || [],
      checklist: [],
      subTasks: [],
      comments: [],
      attachments: [],
      links: [],
      timeTracking: [],
      tags: values.tags || [],
      estimatedHours: values.estimatedHours || 0,
      actualHours: 0,
      longDescription: values.description,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setTasks([...tasks, newTask]);
    message.success('Task created successfully');
    setIsTaskModalVisible(false);
    setEditingTask(null);
    taskForm.resetFields();
  };

  const handleUpdateTask = (values) => {
    const updatedTasks = tasks.map(task => 
      task.id === editingTask.id 
        ? { 
            ...task, 
            ...values,
            longDescription: values.description,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : task
    );
    setTasks(updatedTasks);
    message.success('Task updated successfully');
    setIsTaskModalVisible(false);
    setEditingTask(null);
    taskForm.resetFields();
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    message.success('Task deleted successfully');
  };

  const handleDuplicateTask = (task) => {
    const newTask = {
      ...task,
      id: Math.max(...tasks.map(t => t.id), 0) + 1,
      title: `${task.title} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setTasks([...tasks, newTask]);
    message.success('Task duplicated successfully');
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : task
    ));
    
    // Trigger automations
    const task = tasks.find(t => t.id === taskId);
    if (task && newStatus === 'completed') {
      message.success(`Task "${task.title}" completed! Notifying manager...`);
    }
  };

  const handlePriorityChange = (taskId, newPriority) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, priority: newPriority, updatedAt: new Date().toISOString().split('T')[0] } : task
    ));
  };

  // Checklist Operations
  const handleAddChecklistItem = (values) => {
    if (!selectedTask) return;
    
    const newItem = {
      id: Math.max(...selectedTask.checklist.map(i => i.id), 0) + 1,
      text: values.text,
      completed: false
    };
    const updatedTasks = tasks.map(task => 
      task.id === selectedTask.id 
        ? { 
            ...task, 
            checklist: [...task.checklist, newItem],
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : task
    );
    setTasks(updatedTasks);
    setSelectedTask(updatedTasks.find(t => t.id === selectedTask.id));
    message.success('Checklist item added');
    checklistForm.resetFields();
  };

  const handleUpdateChecklistItem = (values) => {
    if (!selectedTask || !editingChecklistItem) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === selectedTask.id 
        ? { 
            ...task, 
            checklist: task.checklist.map(item => 
              item.id === editingChecklistItem.id 
                ? { ...item, text: values.text }
                : item
            ),
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : task
    );
    setTasks(updatedTasks);
    setSelectedTask(updatedTasks.find(t => t.id === selectedTask.id));
    setEditingChecklistItem(null);
    message.success('Checklist item updated');
    checklistForm.resetFields();
  };

  const handleDeleteChecklistItem = (itemId) => {
    if (!selectedTask) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === selectedTask.id 
        ? { 
            ...task, 
            checklist: task.checklist.filter(item => item.id !== itemId),
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : task
    );
    setTasks(updatedTasks);
    setSelectedTask(updatedTasks.find(t => t.id === selectedTask.id));
    message.success('Checklist item deleted');
  };

  const handleToggleChecklistItem = (taskId, itemId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? {
            ...task,
            checklist: task.checklist.map(item =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            ),
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : task
    ));
  };

  // Sub-task Operations
  const handleAddSubTask = (values) => {
    if (!selectedTask) return;
    
    const newSubTask = {
      id: Math.max(...selectedTask.subTasks.map(s => s.id), 0) + 1,
      title: values.title,
      status: values.status || 'todo',
      assignee: values.assignee,
      dueDate: values.dueDate,
      priority: values.priority || 'medium'
    };
    const updatedTasks = tasks.map(task => 
      task.id === selectedTask.id 
        ? { 
            ...task, 
            subTasks: [...task.subTasks, newSubTask],
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : task
    );
    setTasks(updatedTasks);
    setSelectedTask(updatedTasks.find(t => t.id === selectedTask.id));
    message.success('Sub-task added successfully');
    setIsSubTaskModalVisible(false);
    subTaskForm.resetFields();
  };

  const handleUpdateSubTask = (values) => {
    if (!selectedTask || !editingSubTask) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === selectedTask.id 
        ? { 
            ...task, 
            subTasks: task.subTasks.map(sub => 
              sub.id === editingSubTask.id 
                ? { ...sub, ...values }
                : sub
            ),
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : task
    );
    setTasks(updatedTasks);
    setSelectedTask(updatedTasks.find(t => t.id === selectedTask.id));
    message.success('Sub-task updated successfully');
    setIsSubTaskModalVisible(false);
    setEditingSubTask(null);
    subTaskForm.resetFields();
  };

  const handleDeleteSubTask = (subTaskId) => {
    if (!selectedTask) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === selectedTask.id 
        ? { 
            ...task, 
            subTasks: task.subTasks.filter(sub => sub.id !== subTaskId),
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : task
    );
    setTasks(updatedTasks);
    setSelectedTask(updatedTasks.find(t => t.id === selectedTask.id));
    message.success('Sub-task deleted successfully');
  };

  // Automation Operations
  const handleCreateAutomation = (values) => {
    const newAutomation = {
      id: automations.length + 1,
      ...values,
      active: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAutomations([...automations, newAutomation]);
    message.success('Automation created successfully');
    setIsAutomationEditModalVisible(false);
    automationForm.resetFields();
  };

  const handleUpdateAutomation = (values) => {
    if (!selectedAutomation) return;
    
    const updatedAutomations = automations.map(automation => 
      automation.id === selectedAutomation.id 
        ? { ...automation, ...values }
        : automation
    );
    setAutomations(updatedAutomations);
    message.success('Automation updated successfully');
    setIsAutomationEditModalVisible(false);
    setSelectedAutomation(null);
    automationForm.resetFields();
  };

  const handleDeleteAutomation = (automationId) => {
    setAutomations(automations.filter(a => a.id !== automationId));
    message.success('Automation deleted successfully');
  };

  const handleToggleAutomation = (automationId) => {
    setAutomations(automations.map(automation => 
      automation.id === automationId 
        ? { ...automation, active: !automation.active }
        : automation
    ));
  };

  // Board Operations
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
        reports: [],
        tasks: []
      },
      isTemplate: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
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
                  values.boardType === 'hr' ? <TeamOutlined /> : <DashboardOutlined />,
            updatedAt: new Date().toISOString().split('T')[0]
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

  const handleDuplicateBoard = () => {
    const newBoard = {
      ...currentBoard,
      id: `board-${Date.now()}`,
      name: `${currentBoard.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setBoards([...boards, newBoard]);
    message.success('Board duplicated successfully');
  };

  // Template Operations
  const handleSaveAsTemplate = (values) => {
    const newTemplate = {
      id: savedTemplates.length + 1,
      name: values.templateName,
      description: values.description,
      components: selectedComponents,
      usage: 0,
      category: values.category,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSavedTemplates([...savedTemplates, newTemplate]);
    message.success(`Template "${values.templateName}" saved successfully`);
    setIsSaveTemplateModalVisible(false);
  };

  const handleLoadTemplate = (template) => {
    setSelectedComponents(template.components);
    message.success(`Template "${template.name}" loaded`);
    setIsTemplateModalVisible(false);
  };

  const handleDeleteTemplate = (templateId) => {
    setSavedTemplates(savedTemplates.filter(t => t.id !== templateId));
    message.success('Template deleted successfully');
  };

  // Assignment Operations
  const handleAssignTask = (values) => {
    const selectedTaskObj = tasks.find(t => t.id === values.task);
    if (selectedTaskObj) {
      const updatedTasks = tasks.map(task => 
        task.id === values.task 
          ? { 
              ...task, 
              assignees: [...(task.assignees || []), values.assignee],
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : task
      );
      setTasks(updatedTasks);
      message.success(`Task assigned to ${values.assignee}`);
    }
    setIsAssignModalVisible(false);
  };

  // Report Operations
  const handleSubmitReport = (values) => {
    const newReport = {
      id: divisionReports.length + 1,
      title: values.title,
      status: 'submitted',
      date: new Date().toISOString().split('T')[0],
      submittedBy: 'Alex Rivera'
    };
    message.success('Report submitted successfully');
    setIsReportModalVisible(false);
  };

  const toggleComponent = (componentId) => {
    setSelectedComponents(prev => 
      prev.includes(componentId) 
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  // Column definitions for table view
  const taskColumns = [
    {
      title: (
        <Space>
          <Checkbox />
          <span>Task</span>
        </Space>
      ),
      key: 'title',
      render: (_, record) => (
        <Space>
          <Checkbox />
          <HolderOutlined style={{ cursor: 'grab', color: '#999' }} />
          <Avatar 
            size="small" 
            style={{ 
              backgroundColor: record.status === 'completed' ? '#52c41a' : 
                             record.status === 'in-progress' ? '#1890ff' : '#d9d9d9' 
            }} 
          />
          <div>
            <div>
              <Text 
                strong 
                style={{ 
                  textDecoration: record.status === 'completed' ? 'line-through' : 'none',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setSelectedTask(record);
                  setIsTaskDetailModalVisible(true);
                }}
              >
                {record.title}
              </Text>
            </div>
            <Text type="secondary" style={{ fontSize: 12 }}>ID: TASK-{record.id}</Text>
          </div>
        </Space>
      )
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Select 
          value={record.status} 
          style={{ width: 130 }}
          onChange={(value) => handleStatusChange(record.id, value)}
        >
          <Option value="todo">
            <Tag color="default">To Do</Tag>
          </Option>
          <Option value="in-progress">
            <Tag color="processing">In Progress</Tag>
          </Option>
          <Option value="review">
            <Tag color="warning">In Review</Tag>
          </Option>
          <Option value="completed">
            <Tag color="success">Completed</Tag>
          </Option>
          <Option value="blocked">
            <Tag color="error">Blocked</Tag>
          </Option>
        </Select>
      )
    },
    {
      title: 'Priority',
      key: 'priority',
      render: (_, record) => (
        <Select 
          value={record.priority} 
          style={{ width: 100 }}
          onChange={(value) => handlePriorityChange(record.id, value)}
        >
          <Option value="low">
            <Tag color="green">Low</Tag>
          </Option>
          <Option value="medium">
            <Tag color="orange">Medium</Tag>
          </Option>
          <Option value="high">
            <Tag color="red">High</Tag>
          </Option>
          <Option value="urgent">
            <Tag color="purple">Urgent</Tag>
          </Option>
        </Select>
      )
    },
    {
      title: 'Assignees',
      key: 'assignees',
      render: (_, record) => (
        <Avatar.Group maxCount={3}>
          {(record.assignees || []).map((assignee, index) => (
            <Tooltip key={index} title={assignee}>
              <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
                {assignee.charAt(0)}
              </Avatar>
            </Tooltip>
          ))}
        </Avatar.Group>
      )
    },
    {
      title: 'Due Date',
      key: 'dueDate',
      render: (_, record) => {
        const isOverdue = new Date(record.dueDate) < new Date() && record.status !== 'completed';
        return (
          <Space>
            <CalendarOutlined style={{ color: isOverdue ? '#f5222d' : '#1890ff' }} />
            <Text type={isOverdue ? 'danger' : undefined}>{record.dueDate}</Text>
          </Space>
        );
      }
    },
    {
      title: 'Progress',
      key: 'progress',
      render: (_, record) => {
        const completed = record.checklist?.filter(item => item.completed).length || 0;
        const total = record.checklist?.length || 0;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        return (
          <Tooltip title={`${completed}/${total} items completed`}>
            <Progress percent={percent} size="small" style={{ width: 80 }} />
          </Tooltip>
        );
      }
    },
    {
      title: 'Tags',
      key: 'tags',
      render: (_, record) => (
        <Space>
          {(record.tags || []).map(tag => (
            <Tag key={tag} color="blue">{tag}</Tag>
          ))}
        </Space>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              size="small"
              onClick={() => {
                setSelectedTask(record);
                setIsTaskDetailModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => {
                setEditingTask(record);
                taskForm.setFieldsValue({
                  title: record.title,
                  status: record.status,
                  priority: record.priority,
                  assignees: record.assignees,
                  team: record.team,
                  dueDate: record.dueDate,
                  startDate: record.startDate,
                  estimatedHours: record.estimatedHours,
                  description: record.description,
                  tags: record.tags
                });
                setIsTaskModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Add Sub-task">
            <Button 
              type="text" 
              icon={<PlusOutlined />} 
              size="small"
              onClick={() => {
                setSelectedTask(record);
                setEditingSubTask(null);
                subTaskForm.resetFields();
                setIsSubTaskModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Manage Checklist">
            <Button 
              type="text" 
              icon={<CheckSquareOutlined />} 
              size="small"
              onClick={() => {
                setSelectedTask(record);
                setIsChecklistModalVisible(true);
              }}
            />
          </Tooltip>
          <Dropdown 
            menu={{
              items: [
                {
                  key: 'duplicate',
                  icon: <CopyOutlined />,
                  label: 'Duplicate',
                  onClick: () => handleDuplicateTask(record)
                },
                {
                  key: 'archive',
                  icon: <FolderOutlined />,
                  label: 'Archive'
                },
                {
                  key: 'delete',
                  icon: <DeleteOutlined />,
                  label: 'Delete',
                  danger: true,
                  onClick: () => handleDeleteTask(record.id)
                }
              ]
            }}
          >
            <Button type="text" icon={<HolderOutlined />} size="small" />
          </Dropdown>
        </Space>
      )
    }
  ];

  // Permission menu items
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

  // View options menu
  const viewMenuItems = [
    {
      key: 'table',
      icon: <AppstoreOutlined />,
      label: 'Table View',
      onClick: () => setActiveView('table')
    },
    {
      key: 'kanban',
      icon: <DragOutlined />,
      label: 'Kanban View',
      onClick: () => setActiveView('kanban')
    },
    {
      key: 'calendar',
      icon: <CalendarOutlined />,
      label: 'Calendar View',
      onClick: () => setActiveView('calendar')
    },
    {
      key: 'timeline',
      icon: <ScheduleOutlined />,
      label: 'Timeline View',
      onClick: () => setActiveView('timeline')
    },
    {
      key: 'gantt',
      icon: <BarChartOutlined />,
      label: 'Gantt View',
      onClick: () => setActiveView('gantt')
    }
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
        label: 'Duplicate Board',
        onClick: handleDuplicateBoard
      },
      {
        key: 'refresh',
        icon: <ReloadOutlined />,
        label: 'Refresh Board'
      },
      {
        key: 'export',
        icon: <ExportOutlined />,
        label: 'Export Board'
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
      case 'tasks':
        return (
          <Col span={24} key="tasks">
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckSquareOutlined style={{ color: '#1890ff' }} />
                  <span>Task Management</span>
                </div>
              }
              extra={
                <Space>
                  <Dropdown menu={{ items: viewMenuItems }}>
                    <Button icon={<AppstoreOutlined />}>
                      {activeView.charAt(0).toUpperCase() + activeView.slice(1)} View
                    </Button>
                  </Dropdown>
                  <Button 
                    icon={<PlusOutlined />} 
                    type="primary" 
                    onClick={() => {
                      setEditingTask(null);
                      taskForm.resetFields();
                      setIsTaskModalVisible(true);
                    }}
                  >
                    Create Task
                  </Button>
                  <Button 
                    icon={<ThunderboltOutlined />} 
                    onClick={() => setIsAutomationModalVisible(true)}
                  >
                    Automations
                  </Button>
                </Space>
              }
            >
              {activeView === 'table' && (
                <Table 
                  dataSource={boardData?.tasks || tasks}
                  columns={taskColumns}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                  expandable={{
                    expandedRowRender: (record) => (
                      <div style={{ paddingLeft: 40 }}>
                        <Row gutter={24}>
                          <Col span={12}>
                            <Card size="small" title="Checklist">
                              <List
                                size="small"
                                dataSource={record.checklist || []}
                                renderItem={item => (
                                  <List.Item
                                    actions={[
                                      <Button 
                                        type="text" 
                                        icon={<EditOutlined />} 
                                        size="small"
                                        onClick={() => {
                                          setSelectedTask(record);
                                          setEditingChecklistItem(item);
                                          checklistForm.setFieldsValue({ text: item.text });
                                        }}
                                      />,
                                      <Popconfirm
                                        title="Delete checklist item?"
                                        onConfirm={() => handleDeleteChecklistItem(item.id)}
                                      >
                                        <Button type="text" icon={<DeleteOutlined />} size="small" danger />
                                      </Popconfirm>
                                    ]}
                                  >
                                    <Checkbox 
                                      checked={item.completed}
                                      onChange={() => handleToggleChecklistItem(record.id, item.id)}
                                    >
                                      <Text style={{ 
                                        textDecoration: item.completed ? 'line-through' : 'none',
                                        color: item.completed ? '#999' : 'inherit'
                                      }}>
                                        {item.text}
                                      </Text>
                                    </Checkbox>
                                  </List.Item>
                                )}
                              />
                            </Card>
                          </Col>
                          <Col span={12}>
                            <Card size="small" title="Sub-tasks">
                              <List
                                size="small"
                                dataSource={record.subTasks || []}
                                renderItem={subTask => (
                                  <List.Item
                                    actions={[
                                      <Button 
                                        type="text" 
                                        icon={<EditOutlined />} 
                                        size="small"
                                        onClick={() => {
                                          setSelectedTask(record);
                                          setEditingSubTask(subTask);
                                          subTaskForm.setFieldsValue({
                                            title: subTask.title,
                                            status: subTask.status,
                                            assignee: subTask.assignee,
                                            dueDate: subTask.dueDate,
                                            priority: subTask.priority
                                          });
                                          setIsSubTaskModalVisible(true);
                                        }}
                                      />,
                                      <Popconfirm
                                        title="Delete sub-task?"
                                        onConfirm={() => handleDeleteSubTask(subTask.id)}
                                      >
                                        <Button type="text" icon={<DeleteOutlined />} size="small" danger />
                                      </Popconfirm>
                                    ]}
                                  >
                                    <Space>
                                      <Tag color={getStatusColor(subTask.status)}>
                                        {subTask.status}
                                      </Tag>
                                      <Text>{subTask.title}</Text>
                                      <Tag color={getPriorityColor(subTask.priority)}>
                                        {subTask.priority}
                                      </Tag>
                                      <Text type="secondary">{subTask.assignee}</Text>
                                    </Space>
                                  </List.Item>
                                )}
                              />
                            </Card>
                          </Col>
                        </Row>
                      </div>
                    )
                  }}
                />
              )}
              {activeView === 'kanban' && (
                <KanbanBoard tasks={boardData?.tasks || tasks} />
              )}
              {activeView === 'calendar' && (
                <div style={{ textAlign: 'center', padding: 40 }}>
                  <CalendarOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                  <Title level={4}>Calendar View</Title>
                  <Text type="secondary">Tasks displayed by due date on calendar</Text>
                </div>
              )}
              {activeView === 'timeline' && (
                <div style={{ textAlign: 'center', padding: 40 }}>
                  <ScheduleOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                  <Title level={4}>Timeline View</Title>
                  <Text type="secondary">Gantt chart showing task duration and dependencies</Text>
                </div>
              )}
            </Card>
          </Col>
        );
        return (
          <Col span={24} key="automations">
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ThunderboltOutlined style={{ color: '#1890ff' }} />
                  <span>Automations</span>
                </div>
              }
              extra={
                <Button 
                  icon={<PlusOutlined />} 
                  type="primary"
                  onClick={() => {
                    setSelectedAutomation(null);
                    automationForm.resetFields();
                    setIsAutomationEditModalVisible(true);
                  }}
                >
                  Create Automation
                </Button>
              }
            >
              <List
                itemLayout="horizontal"
                dataSource={automations}
                renderItem={automation => (
                  <List.Item
                    actions={[
                      <Switch 
                        checked={automation.active} 
                        onChange={() => handleToggleAutomation(automation.id)}
                      />,
                      <Button 
                        type="text" 
                        icon={<EditOutlined />}
                        onClick={() => {
                          setSelectedAutomation(automation);
                          automationForm.setFieldsValue({
                            name: automation.name,
                            trigger: automation.trigger,
                            condition: automation.condition,
                            action: automation.action
                          });
                          setIsAutomationEditModalVisible(true);
                        }}
                      />,
                      <Popconfirm
                        title="Delete automation?"
                        onConfirm={() => handleDeleteAutomation(automation.id)}
                      >
                        <Button type="text" icon={<DeleteOutlined />} danger />
                      </Popconfirm>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon={<ThunderboltOutlined />} style={{ backgroundColor: '#faad14' }} />}
                      title={automation.name}
                      description={
                        <Space direction="vertical" size="small">
                          <Text type="secondary">Trigger: {automation.trigger}</Text>
                          <Text type="secondary">Condition: {automation.condition}</Text>
                          <Text type="secondary">Action: {automation.action}</Text>
                          <Text type="secondary">Created: {automation.createdAt}</Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
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
              <Space>
                <Text type="secondary">Updated:</Text>
                <Text>{currentBoard.updatedAt}</Text>
              </Space>
            </Space>
          </Card>
        </Col>

        {/* Dynamic Board Components */}
        {selectedComponents.map(componentId => renderComponent(componentId))}
      </Row>

      {/* Task Detail Modal */}
      <Modal
        title="Task Details"
        open={isTaskDetailModalVisible}
        onCancel={() => setIsTaskDetailModalVisible(false)}
        width={800}
        footer={[
          <Button key="back" onClick={() => setIsTaskDetailModalVisible(false)}>
            Close
          </Button>,
          <Button 
            key="edit" 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => {
              setIsTaskDetailModalVisible(false);
              setEditingTask(selectedTask);
              taskForm.setFieldsValue({
                title: selectedTask.title,
                status: selectedTask.status,
                priority: selectedTask.priority,
                assignees: selectedTask.assignees,
                team: selectedTask.team,
                dueDate: selectedTask.dueDate,
                startDate: selectedTask.startDate,
                estimatedHours: selectedTask.estimatedHours,
                description: selectedTask.description,
                tags: selectedTask.tags
              });
              setIsTaskModalVisible(true);
            }}
          >
            Edit Task
          </Button>
        ]}
      >
        {selectedTask && (
          <div>
            <Descriptions bordered size="small" column={2}>
              <Descriptions.Item label="Task ID">TASK-{selectedTask.id}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={getStatusColor(selectedTask.status)}>{selectedTask.status}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Priority">
                <Tag color={getPriorityColor(selectedTask.priority)}>{selectedTask.priority}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Team">{selectedTask.team}</Descriptions.Item>
              <Descriptions.Item label="Due Date">{selectedTask.dueDate}</Descriptions.Item>
              <Descriptions.Item label="Start Date">{selectedTask.startDate}</Descriptions.Item>
              <Descriptions.Item label="Estimated Hours">{selectedTask.estimatedHours}h</Descriptions.Item>
              <Descriptions.Item label="Actual Hours">{selectedTask.actualHours}h</Descriptions.Item>
              <Descriptions.Item label="Created">{selectedTask.createdAt}</Descriptions.Item>
              <Descriptions.Item label="Updated">{selectedTask.updatedAt}</Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">Description</Divider>
            <Text>{selectedTask.longDescription}</Text>

            <Divider orientation="left">Checklist</Divider>
            <List
              size="small"
              dataSource={selectedTask.checklist || []}
              renderItem={item => (
                <List.Item>
                  <Checkbox checked={item.completed}>
                    <Text style={{ 
                      textDecoration: item.completed ? 'line-through' : 'none',
                      color: item.completed ? '#999' : 'inherit'
                    }}>
                      {item.text}
                    </Text>
                  </Checkbox>
                </List.Item>
              )}
            />

            <Divider orientation="left">Sub-tasks</Divider>
            <Table 
              dataSource={selectedTask.subTasks || []}
              columns={[
                { title: 'Title', dataIndex: 'title' },
                { 
                  title: 'Status', 
                  dataIndex: 'status',
                  render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>
                },
                { title: 'Assignee', dataIndex: 'assignee' },
                { title: 'Due Date', dataIndex: 'dueDate' },
                { 
                  title: 'Priority', 
                  dataIndex: 'priority',
                  render: (priority) => <Tag color={getPriorityColor(priority)}>{priority}</Tag>
                }
              ]}
              size="small"
              pagination={false}
            />

            <Divider orientation="left">Attachments</Divider>
            <List
              size="small"
              dataSource={selectedTask.attachments || []}
              renderItem={item => (
                <List.Item>
                  <Space>
                    <PaperClipOutlined />
                    <a href={item.url}>{item.name}</a>
                    <Text type="secondary">({item.size})</Text>
                  </Space>
                </List.Item>
              )}
            />

            <Divider orientation="left">Comments</Divider>
            <List
              size="small"
              dataSource={selectedTask.comments || []}
              renderItem={comment => (
                <List.Item>
                  <Space direction="vertical" size={0}>
                    <Space>
                      <Avatar size="small" icon={<UserOutlined />} />
                      <Text strong>{comment.user}</Text>
                      <Text type="secondary">{comment.timestamp}</Text>
                    </Space>
                    <Text style={{ marginLeft: 28 }}>{comment.text}</Text>
                  </Space>
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>

      {/* Create/Edit Task Modal */}
      <Modal
        title={editingTask ? "Edit Task" : "Create New Task"}
        open={isTaskModalVisible}
        onCancel={() => {
          setIsTaskModalVisible(false);
          setEditingTask(null);
          taskForm.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={taskForm}
          layout="vertical"
          onFinish={editingTask ? handleUpdateTask : handleCreateTask}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item name="status" label="Status" initialValue="todo">
            <Select>
              <Option value="todo">To Do</Option>
              <Option value="in-progress">In Progress</Option>
              <Option value="review">In Review</Option>
              <Option value="completed">Completed</Option>
              <Option value="blocked">Blocked</Option>
            </Select>
          </Form.Item>
          <Form.Item name="priority" label="Priority" initialValue="medium">
            <Select>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
              <Option value="urgent">Urgent</Option>
            </Select>
          </Form.Item>
          <Form.Item name="assignees" label="Assignees">
            <Select mode="multiple">
              <Option value="Emma Watson">Emma Watson</Option>
              <Option value="James Chen">James Chen</Option>
              <Option value="David Kim">David Kim</Option>
              <Option value="Lisa Wang">Lisa Wang</Option>
              <Option value="Michael Brown">Michael Brown</Option>
              <Option value="Sarah Johnson">Sarah Johnson</Option>
            </Select>
          </Form.Item>
          <Form.Item name="team" label="Team">
            <Select>
              <Option value="Frontend">Frontend</Option>
              <Option value="Backend">Backend</Option>
              <Option value="DevOps">DevOps</Option>
              <Option value="QA">QA</Option>
            </Select>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="startDate" label="Start Date">
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="dueDate" label="Due Date">
                <Input type="date" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="estimatedHours" label="Estimated Hours">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} placeholder="Enter description..." />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select mode="tags">
              <Option value="UI/UX">UI/UX</Option>
              <Option value="Backend">Backend</Option>
              <Option value="Frontend">Frontend</Option>
              <Option value="Bug">Bug</Option>
              <Option value="Feature">Feature</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => {
                setIsTaskModalVisible(false);
                setEditingTask(null);
                taskForm.resetFields();
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingTask ? "Update" : "Create"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Checklist Management Modal */}
      <Modal
        title="Manage Checklist"
        open={isChecklistModalVisible}
        onCancel={() => {
          setIsChecklistModalVisible(false);
          setEditingChecklistItem(null);
          checklistForm.resetFields();
        }}
        footer={null}
        width={500}
      >
        {selectedTask && (
          <div>
            <Form
              form={checklistForm}
              layout="inline"
              onFinish={editingChecklistItem ? handleUpdateChecklistItem : handleAddChecklistItem}
              style={{ marginBottom: 16 }}
            >
              <Form.Item name="text" style={{ flex: 1 }}>
                <Input placeholder="Checklist item" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {editingChecklistItem ? "Update" : "Add"}
                </Button>
              </Form.Item>
            </Form>

            <List
              dataSource={selectedTask.checklist || []}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button 
                      type="text" 
                      icon={<EditOutlined />} 
                      size="small"
                      onClick={() => {
                        setEditingChecklistItem(item);
                        checklistForm.setFieldsValue({ text: item.text });
                      }}
                    />,
                    <Popconfirm
                      title="Delete checklist item?"
                      onConfirm={() => handleDeleteChecklistItem(item.id)}
                    >
                      <Button type="text" icon={<DeleteOutlined />} size="small" danger />
                    </Popconfirm>
                  ]}
                >
                  <Checkbox 
                    checked={item.completed}
                    onChange={() => handleToggleChecklistItem(selectedTask.id, item.id)}
                  >
                    <Text style={{ 
                      textDecoration: item.completed ? 'line-through' : 'none',
                      color: item.completed ? '#999' : 'inherit'
                    }}>
                      {item.text}
                    </Text>
                  </Checkbox>
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>

      {/* Sub-task Management Modal */}
      <Modal
        title={editingSubTask ? "Edit Sub-task" : "Add Sub-task"}
        open={isSubTaskModalVisible}
        onCancel={() => {
          setIsSubTaskModalVisible(false);
          setEditingSubTask(null);
          subTaskForm.resetFields();
        }}
        footer={null}
      >
        <Form
          form={subTaskForm}
          layout="vertical"
          onFinish={editingSubTask ? handleUpdateSubTask : handleAddSubTask}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Enter sub-task title" />
          </Form.Item>
          <Form.Item name="status" label="Status" initialValue="todo">
            <Select>
              <Option value="todo">To Do</Option>
              <Option value="in-progress">In Progress</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item name="priority" label="Priority" initialValue="medium">
            <Select>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
          <Form.Item name="assignee" label="Assignee">
            <Select>
              <Option value="Emma Watson">Emma Watson</Option>
              <Option value="James Chen">James Chen</Option>
              <Option value="David Kim">David Kim</Option>
              <Option value="Lisa Wang">Lisa Wang</Option>
            </Select>
          </Form.Item>
          <Form.Item name="dueDate" label="Due Date">
            <Input type="date" />
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => {
                setIsSubTaskModalVisible(false);
                setEditingSubTask(null);
                subTaskForm.resetFields();
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingSubTask ? "Update" : "Add"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Automation Modal */}
      <Modal
        title="Automation Rules"
        open={isAutomationModalVisible}
        onCancel={() => setIsAutomationModalVisible(false)}
        width={600}
        footer={[
          <Button key="back" onClick={() => setIsAutomationModalVisible(false)}>
            Close
          </Button>,
          <Button 
            key="create" 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => {
              setIsAutomationModalVisible(false);
              setSelectedAutomation(null);
              automationForm.resetFields();
              setIsAutomationEditModalVisible(true);
            }}
          >
            New Automation
          </Button>
        ]}
      >
        <List
          itemLayout="horizontal"
          dataSource={automations}
          renderItem={automation => (
            <List.Item
              actions={[
                <Switch 
                  checked={automation.active} 
                  onChange={() => handleToggleAutomation(automation.id)}
                />,
                <Button 
                  type="text" 
                  icon={<EditOutlined />}
                  onClick={() => {
                    setIsAutomationModalVisible(false);
                    setSelectedAutomation(automation);
                    automationForm.setFieldsValue({
                      name: automation.name,
                      trigger: automation.trigger,
                      condition: automation.condition,
                      action: automation.action
                    });
                    setIsAutomationEditModalVisible(true);
                  }}
                />,
                <Popconfirm
                  title="Delete automation?"
                  onConfirm={() => handleDeleteAutomation(automation.id)}
                >
                  <Button type="text" icon={<DeleteOutlined />} danger />
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<ThunderboltOutlined />} style={{ backgroundColor: '#faad14' }} />}
                title={automation.name}
                description={
                  <div>
                    <Tag>Trigger: {automation.trigger}</Tag>
                    <Tag>Condition: {automation.condition}</Tag>
                    <Tag>Action: {automation.action}</Tag>
                    <div>Created: {automation.createdAt}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Modal>

      {/* Create/Edit Automation Modal */}
      <Modal
        title={selectedAutomation ? "Edit Automation" : "Create Automation"}
        open={isAutomationEditModalVisible}
        onCancel={() => {
          setIsAutomationEditModalVisible(false);
          setSelectedAutomation(null);
          automationForm.resetFields();
        }}
        footer={null}
      >
        <Form
          form={automationForm}
          layout="vertical"
          onFinish={selectedAutomation ? handleUpdateAutomation : handleCreateAutomation}
        >
          <Form.Item name="name" label="Automation Name" rules={[{ required: true }]}>
            <Input placeholder="e.g., Notify on High Priority" />
          </Form.Item>
          <Form.Item name="trigger" label="Trigger" rules={[{ required: true }]}>
            <Select>
              <Option value="task.created">Task Created</Option>
              <Option value="status.changed">Status Changed</Option>
              <Option value="due.date.approaching">Due Date Approaching</Option>
              <Option value="task.assigned">Task Assigned</Option>
            </Select>
          </Form.Item>
          <Form.Item name="condition" label="Condition" rules={[{ required: true }]}>
            <Input placeholder="e.g., priority = high" />
          </Form.Item>
          <Form.Item name="action" label="Action" rules={[{ required: true }]}>
            <Select>
              <Option value="notify.manager">Notify Manager</Option>
              <Option value="notify.assignee">Notify Assignee</Option>
              <Option value="move.to.done">Move to Done</Option>
              <Option value="send.reminder">Send Reminder</Option>
              <Option value="create.subtask">Create Sub-task</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => {
                setIsAutomationEditModalVisible(false);
                setSelectedAutomation(null);
                automationForm.resetFields();
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {selectedAutomation ? "Update" : "Create"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

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
                </Button>,
                <Popconfirm
                  title="Delete template?"
                  onConfirm={() => handleDeleteTemplate(template.id)}
                >
                  <Button type="text" icon={<DeleteOutlined />} size="small" danger />
                </Popconfirm>
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
                    <div>
                      <Text type="secondary">Created: {template.createdAt}</Text>
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
              {tasks.map(task => (
                <Option key={task.id} value={task.id}>{task.title}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="assignee" label="Assign To" rules={[{ required: true }]}>
            <Select>
              <Option value="Emma Watson">Emma Watson</Option>
              <Option value="James Chen">James Chen</Option>
              <Option value="David Kim">David Kim</Option>
              <Option value="Lisa Wang">Lisa Wang</Option>
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